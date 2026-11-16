# Евразия Сити Транс — лендинг (Next.js 15)

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Что заменить

- `src/config/site.ts`: телефон, ссылки WhatsApp / Telegram / MAX / VK, домен. Если оставить пустую строку, кнопка не покажется.
- `src/config/content.ts`: тексты, машины, туры, FAQ.
- `public/img/`: фото (hero-van.jpg, van-real.jpg, interior-1.jpg, interior-2.jpg).

## Заявки в Telegram

1. Создайте бота через @BotFather и скопируйте токен.
2. Напишите боту любое сообщение и откройте `https://api.telegram.org/bot<TOKEN>/getUpdates`. В ответе найдите `chat.id`.
3. В Cloudflare откройте Workers → evrazoa-landing → Settings → Variables and Secrets и добавьте секреты `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.

Если секреты не заданы, форма откроет WhatsApp с готовым текстом заявки.

## Деплой (Cloudflare Workers)

- Next.js собирается в статику (`out/`), её отдаёт Worker из `worker/index.js`. Он же обрабатывает `POST /api/booking`.
- Cloudflare Workers Builds сам собирает и выкладывает сайт при каждом push в `main`. Команда сборки: `npm run build`, команда деплоя: `npx wrangler deploy`.
- Локальная проверка Worker: `npm run preview`. Секреты для неё кладутся в `.dev.vars`, образец лежит в `.dev.vars.example`.

## Обычный PHP-хостинг (Reg.ru и т.п.)

```bash
./scripts/pack-hosting.sh   # → evrazoa-hosting.zip
```

1. Загрузите содержимое архива в корень сайта (обычно `www/<домен>/`), вместе со скрытым файлом `.htaccess`.
2. Отредактируйте `api/config.php`: почта для заявок и/или Telegram-бот.
3. Когда SSL-сертификат выпущен, включите перенаправление на HTTPS в `.htaccess`.

Форма отправляет `POST /api/booking`, который `.htaccess` передаёт в `api/booking.php`. Если сервер не смог отправить заявку, у посетителя откроется почта или WhatsApp с готовым текстом.
