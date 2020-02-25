#!/bin/bash
set -xe

eval "$(ssh-agent -s)"
ssh-add
cd client
yarn
CI=false yarn build
rsync -rq --delete --rsync-path="mkdir -p battleship-client && rsync" \
$TRAVIS_BUILD_DIR/client/build/ travis@51.15.124.103:battleship-client
npm install -g pm2
cd ../server
pm2 deploy production setup
pm2 deploy ecosystem.config.js production --force

