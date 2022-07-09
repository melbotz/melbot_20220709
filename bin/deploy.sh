#!/bin/bash

export NODE_OPTIONS=--openssl-legacy-provider

# vars
TMPFILE="/tmp/gitmark.$$.txt"
DEFAULT_MESSAGE="webcredits"
MESSAGE="${1:-$DEFAULT_MESSAGE}"
# set up btm as remote exe
BTMEXE="ssh ubuntu@157.90.144.229"
LOCKFILE="/tmp/deploy_melbot_20220709.sh"

# check for lock
if [ ! -f "${LOCKFILE}" ]
then
  echo no lockfile
else
  echo 1>&2 "Fatal error: another process has been keeping the lock for too long or the lock file is 
inaccessible"
  exit -1
fi

# add lock
> "${LOCKFILE}"

# pull latest
git pull origin gh-pages

# git add webcredits
# git commit -m "$MESSAGE"

# check if marked
git log -1 --pretty=%s | grep '^gitmark '
if [ $? -eq 0 ]
then
  echo git marked already
  rm "${LOCKFILE}"
  exit
fi

echo removing ${LOCKFILE}
rm "${LOCKFILE}"

exit

# push new changes
git push origin gh-pages
git push gogs gh-pages

# run twice in case new tx is not there
git mark
# sleep 1
git mark > "${TMPFILE}"
# TODO check for empty tx

cat "${TMPFILE}"

TX=$( tail -1 < "${TMPFILE}" )

echo
echo "${TX}"

HASH=$(${BTMEXE} "${TX}")
echo "${HASH}" | grep '^[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f].*'
if [ $? -eq 1 ]
then
  echo no hash found, something went wrong
  exit
fi
RES=$(git commit --allow-empty -m "gitmark ${HASH}")
echo "${RES}"

# push changes
git push origin gh-pages
git push gogs gh-pages

# send to relay
RELAY=$(git config gitmark.relay)
if [ ! -z "$RELAY" ]
then
  git-mark-list --count 1 | websocat "$RELAY"
fi

# unlock
rm "${LOCKFILE}"
