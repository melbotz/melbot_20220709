#!/usr/bin/env bash

git push github
npm publish

#RELAY="ws://nostr.rocks:1617"
RELAY=$(git config gitmark.relay)
GENESIS="gitmark:d60703354709c88724f058cc2184a28831f6c8635324837650f5ccfff3ce5595:0"
CREATED=1657316029


git-mark-list $(git config gitmark.secret) --genesis "${GENESIS}" --created "${CREATED}" -g $(cat package.json | jq -r '.repository.url')  | websocat $RELAY