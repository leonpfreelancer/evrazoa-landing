<?php
// Скопируйте этот файл в config.php (в той же папке api/) и заполните.
// Достаточно одного канала: Telegram или почта. Можно оба.

return [
    // Telegram-бот: токен от @BotFather и chat_id получателя
    'telegram_bot_token' => '',
    'telegram_chat_id'   => '',

    // Куда приходят заявки (несколько адресов — через запятую)
    'email_to'   => 'info@evraziacitytrans.ru',
    // Отправитель. Пусто = smtp_user
    'email_from' => '',

    // SMTP почтового ящика (Beget: smtp.beget.com, 465, ssl).
    // Если smtp_pass пустой — используется mail() хостинга.
    'smtp_host'   => 'smtp.beget.com',
    'smtp_port'   => 465,
    'smtp_secure' => 'ssl', // ssl | tls | none
    'smtp_user'   => 'info@evraziacitytrans.ru',
    'smtp_pass'   => '',
];
