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
