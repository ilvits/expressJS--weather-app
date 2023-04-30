#!/bin/bash

git reset --hard
git pull
echo "
Branch: " $(git branch --show-current)
npx tailwindcss -i ./src/css/input.css -o ./public/css/style.css
workbox generateSW workbox-config.js

# echo "The following node processes were found:"
# ps aux | grep " node " | grep -v grep
# nodepids=$(ps aux | grep " node " | grep -v grep | cut -c10-15)

# echo "OK, so we will stop these process/es now..."

# for nodepid in ${nodepids[@]}
# do
# echo "Stopping PID :"$nodepid
# kill -9 $nodepid
# done
echo "Done"