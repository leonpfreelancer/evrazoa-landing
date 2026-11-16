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
    $headers = "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    if ($mailFrom) $headers .= "From: {$mailFrom}\r\n";
    if (mail($mailTo, $subject, implode("\n", $lines), $headers)) $ok = true;
    else error_log('mail() failed');
}

$ok ? out(['ok' => true]) : out(['error' => 'send failed'], 502);
