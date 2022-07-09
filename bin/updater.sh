#!/usr/bin/env bash

RELAY=${1:-ws://nostr.rocks:1617}

echo "[\"REQ\", \"tail\", { \"since\": $(date +%s) }]" | websocat -n $RELAY | while read -r line
do 
  echo $line 
  git pull
done
