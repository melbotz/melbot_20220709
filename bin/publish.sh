#!/usr/bin/env bash

git-mark-list $(git config gitmark.secret) | websocat $(git config gitmark.relay)