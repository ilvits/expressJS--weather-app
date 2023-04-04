#!/bin/bash

git reset --hard
git pull
npx tailwindcss -i ./src/css/input.css -o ./public/css/style.css
workbox generateSW workbox-config.js