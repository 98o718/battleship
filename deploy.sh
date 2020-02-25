#!/bin/bash
set -xe

eval "$(ssh-agent -s)"
ssh-add
cd client
yarn
CI=false yarn build
rsync -rq --delete --rsync-path="mkdir -p battleship-client && rsync" \
$TRAVIS_BUILD_DIR/client/build/ travis@51.15.124.103:battleship-client
