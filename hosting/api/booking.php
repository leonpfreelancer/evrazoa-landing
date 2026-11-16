<?php
// Приём заявок с формы: отправка в Telegram и/или на почту.
// Настройки — в api/config.php (образец: config.example.php).

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

function out($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(['error' => 'method not allowed'], 405);

$cfgFile = __DIR__ . '/config.php';
$cfg = file_exists($cfgFile) ? require $cfgFile : [];
$token  = trim($cfg['telegram_bot_token'] ?? '');
$chatId = trim($cfg['telegram_chat_id'] ?? '');
$mailTo = trim($cfg['email_to'] ?? '');
$mailFrom = trim($cfg['email_from'] ?? '');

if (!($token && $chatId) && !$mailTo) out(['error' => 'not configured'], 503);

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) out(['error' => 'bad json'], 400);

$labels = [
    'name' => 'Имя', 'contact' => 'Контакт', 'from' => 'Откуда', 'to' => 'Куда',
    'date' => 'Дата', 'time' => 'Время', 'flight' => 'Рейс', 'passengers' => 'Пассажиров',
    'vehicle' => 'Машина', 'comment' => 'Комментарий',
];
$get = function ($k) use ($body) {
    return mb_substr(trim((string)($body[$k] ?? '')), 0, 1000);
};
foreach (['name', 'contact', 'from', 'to', 'date'] as $req) {
    if ($get($req) === '') out(['error' => 'missing fields'], 400);
}

// Простая защита от повторной отправки: не чаще 1 раза в 20 секунд с одного IP
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$lock = sys_get_temp_dir() . '/evr_booking_' . md5($ip);
if (file_exists($lock) && time() - filemtime($lock) < 20) out(['error' => 'too many requests'], 429);
@touch($lock);

$ok = false;

// Telegram
if ($token && $chatId) {
    $lines = [];
    foreach ($labels as $k => $label) {
        $v = $get($k);
        if ($v !== '') $lines[] = '<b>' . $label . ':</b> ' . htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
    }
    $text = "🚐 <b>Новая заявка</b>\n\n" . implode("\n", $lines);
    $payload = json_encode(['chat_id' => $chatId, 'text' => $text, 'parse_mode' => 'HTML'], JSON_UNESCAPED_UNICODE);

    $ch = curl_init("https://api.telegram.org/bot{$token}/sendMessage");
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($code === 200) $ok = true;
    else error_log("Telegram error $code: $res");
}

// Почта
if ($mailTo) {
    $lines = [];
    foreach ($labels as $k => $label) {
        $v = $get($k);
        if ($v !== '') $lines[] = $label . ': ' . str_replace(["\r", "\n"], ' ', $v);
    }
    $subject = '=?UTF-8?B?' . base64_encode('Заявка на трансфер: ' . $get('name')) . '?=';
    $text = implode("\n", $lines);
    $recipients = array_filter(array_map('trim', explode(',', $mailTo)));

    if (!empty($cfg['smtp_host']) && !empty($cfg['smtp_user']) && !empty($cfg['smtp_pass'])) {
        // Отправка через SMTP почтового ящика (например, Beget)
        $from = $mailFrom ?: $cfg['smtp_user'];
        $err = smtp_send($cfg, $from, $recipients, $subject, $text);
        if ($err === null) $ok = true;
        else error_log('SMTP error: ' . $err);
    } else {
        $headers = "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n";
        if ($mailFrom) $headers .= "From: {$mailFrom}\r\n";
        if (mail(implode(', ', $recipients), $subject, $text, $headers)) $ok = true;
        else error_log('mail() failed');
    }
}

// Минимальный SMTP-клиент (SSL, AUTH LOGIN). Возвращает null при успехе или текст ошибки.
function smtp_send($cfg, $from, $to, $subject, $text) {
    $host = $cfg['smtp_host'];
    $port = (int)($cfg['smtp_port'] ?? 465);
    $secure = $cfg['smtp_secure'] ?? 'ssl';
    $remote = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $fp = @stream_socket_client($remote, $errno, $errstr, 15);
    if (!$fp) return "connect $remote: $errstr";
    stream_set_timeout($fp, 15);

    $read = function () use ($fp) {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $data;
    };
    $cmd = function ($c, $expect) use ($fp, $read) {
        if ($c !== null) fwrite($fp, $c . "\r\n");
        $r = $read();
        return (strpos($r, (string)$expect) === 0) ? null : trim($r);
    };

    $domain = substr(strrchr($from, '@'), 1) ?: 'localhost';
    if ($e = $cmd(null, 220)) return "greeting: $e";
    if ($e = $cmd("EHLO $domain", 250)) return "EHLO: $e";
    if ($secure === 'tls') {
        if ($e = $cmd('STARTTLS', 220)) return "STARTTLS: $e";
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) return 'TLS failed';
        if ($e = $cmd("EHLO $domain", 250)) return "EHLO2: $e";
    }
    if ($e = $cmd('AUTH LOGIN', 334)) return "AUTH: $e";
    if ($e = $cmd(base64_encode($cfg['smtp_user']), 334)) return "user: $e";
    if ($e = $cmd(base64_encode($cfg['smtp_pass']), 235)) return "pass: $e";
    if ($e = $cmd("MAIL FROM:<$from>", 250)) return "MAIL FROM: $e";
    foreach ($to as $rcpt) {
        if ($e = $cmd("RCPT TO:<$rcpt>", 250)) return "RCPT $rcpt: $e";
    }
    if ($e = $cmd('DATA', 354)) return "DATA: $e";

    $headers = [
        'Date: ' . date('r'),
        'From: ' . $from,
        'To: ' . implode(', ', $to),
        'Subject: ' . $subject,
        'Message-ID: <' . bin2hex(random_bytes(8)) . '@' . $domain . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    $msg = implode("\r\n", $headers) . "\r\n\r\n" . rtrim(chunk_split(base64_encode($text), 76, "\r\n")) . "\r\n.";
    if ($e = $cmd($msg, 250)) return "send: $e";
    $cmd('QUIT', 221);
    fclose($fp);
    return null;
}

$ok ? out(['ok' => true]) : out(['error' => 'send failed'], 502);
