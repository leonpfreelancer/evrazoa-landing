#!/usr/bin/env bash
# Сборка архива для обычного PHP-хостинга (Reg.ru и т.п.)
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build
rm -rf dist-hosting
cp -r out dist-hosting
cp -r hosting/. dist-hosting/
# Рабочий конфиг: свой (hosting/api/config.php, в git не попадает) или образец
[ -f hosting/api/config.php ] || cp hosting/api/config.example.php dist-hosting/api/config.php
rm -f evrazoa-hosting.zip
(cd dist-hosting && zip -rq ../evrazoa-hosting.zip .)
echo "Готово: evrazoa-hosting.zip"

# Архив для обновления уже работающего сайта: без api/config.php (там пароли)
rm -f evrazoa-update.zip
(cd dist-hosting && zip -rq ../evrazoa-update.zip . -x 'api/config.php')
echo "Готово: evrazoa-update.zip (без config.php)"
