#!/usr/bin/env node

import { execSync as $ } from 'child_process'
import WebSocket from 'ws'

var TIME = 300000

var wsdeploy = true

function loop() {
  console.log('deploying', process.cwd())
  var out = $('./bin/deploy.sh')
  console.log('out', out)
}

function getLastCommit() {
  var lastCommit = $('./bin/gitmark.sh').toString()
  console.log(lastCommit)
  lastCommit = lastCommit?.replace(' ', ':')
  return lastCommit
}

loop()
setInterval(loop, TIME)

if (wsdeploy) {
  try {
    var relay = 'ws://nostr.rocks:1617'
    const ws = new WebSocket(relay)

    ws.on('open', function open() {
      console.log('opened', relay)

      // var lastCommit = getLastCommit()

      var now = Math.round((new Date()).getTime() / 1000) - 10000

      var msg = `["REQ", "tail", {"since": ${now} }`
      // var msg = '["REQ", "mirror", {"since": 1643698576  }]'

      console.log('sub', msg)

      ws.send(msg)
    })

    ws.on('message', function incoming(message) {
      console.log('received: %s', message)
      // todo if pub run loop
      $('git pull origin gh-pages')
      // lastCommit = getLastCommit()
    })
  } catch (e) {
    console.error(e)
  }
}
