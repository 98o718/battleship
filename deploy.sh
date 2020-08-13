#!/bin/bash
set -xe

cd client
yarn
CI=false yarn build
rsync -rq --delete --rsync-path="mkdir -p battleship-client && rsync" \
$TRAVIS_BUILD_DIR/client/build/ hosting@95.181.152.127:battleship-client
npm install -g pm2
cd ../server
pm2 deploy ecosystem.config.js production --force

