#!/bin/bash
set -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add
  cd client
  yarn
  CI=false yarn build
  rsync -rq --delete --rsync-path="mkdir -p battleship-client && rsync" \
  $TRAVIS_BUILD_DIR/client/build/ travis@51.15.124.103:battleship-client
else
  echo "Not deploying, since this branch isn't master."
fi