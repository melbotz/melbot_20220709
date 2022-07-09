#!/usr/bin/env bash

git push github
npm publish

#RELAY="ws://nostr.rocks:1617"
RELAY=$(git config gitmark.relay)

git-mark-list $(git config gitmark.secret) -g $(cat package.json | jq -r '.repository.url')  | websocat $RELAY