#!/usr/bin/env bash

#RELAY="ws://nostr.rocks:1617"
RELAY=$(git config gitmark.relay)

git-mark-list $(git config gitmark.secret) -g $(cat package.json | jq -r '.repository.url')  | websocat $RELAY