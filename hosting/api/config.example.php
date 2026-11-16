<?php
// Скопируйте этот файл в config.php (в той же папке api/) и заполните.
// Достаточно одного канала: Telegram или почта. Можно оба.

return [
    // Telegram-бот: токен от @BotFather и chat_id получателя
    'telegram_bot_token' => '',
    'telegram_chat_id'   => '',

    // Почта, куда приходят заявки
    'email_to'   => 'info@evraziacitytrans.ru',
    // Отправитель — ящик на домене этого сайта (например, noreply@ваш-домен.ru), иначе письма уйдут в спам
    'email_from' => '',
];
