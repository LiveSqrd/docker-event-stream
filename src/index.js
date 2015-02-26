'use strict';
import {default as Docker} from 'docker-remote-api'
import {Readable} from 'stream'
import {default as inject} from 'reconnect-core'
import {default as throughJson} from 'through-json'
import {default as filterStream} from 'through2-filter'

let reconnect = inject(function(docker) {
  let s = throughJson()
    , req = docker.get('/events', { qs: this.since && { since: this.since } }, (err, res) => {
        if (err) return s.emit('error', err)
        res
          .on('error', (err) => s.emit('error', err))
          .pipe(s)
        s.emit('connect')
      })

  return s
})

export default function eventStream(opts, cb) {
  if (typeof opts == 'function') [opts, cb] = [undefined, opts]
  let {since, host} = opts || {}

  let stream
    , re = reconnect({}, (conn) => conn.pipe(stream, { end: false }))

  stream = filterStream.obj((event) => {
    if (event.time) {
      if (re.since && event.time < re.since)
        return false
      re.since = event.time
    }
    return true
  })

  re.since = since
  re.connect(Docker({host}))
    .on('connection', (conn) => stream.emit('connection'))
    .on('reconnect', (n, delay) => stream.emit('reconnect', n, delay))
    .on('disconnect', (err) => stream.emit('disconnect', err))

  if (cb) {
    let onError, onConnection
    
    stream.once('connection', onConnection =()=> {
      stream.removeListener('error', onError)
      cb(null, stream)
    })

    stream.once('error', onError =(err)=> {
      stream.removeListener('connection', onConnection)
      cb(err)
    })
  }

  return stream
}
