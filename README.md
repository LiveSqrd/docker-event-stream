# docker-event-stream

  The Docker event stream as a node stream.
  Automatically retries on connection failure. This includes the initial connection.

## Installation

    npm install docker-event-stream

## API
```js
var eventStream = require('docker-event-stream')
```

### eventStream({ host = process.env.DOCKER_HOST || '/var/run/docker.sock' , since }, function(err, stream)) -> EventStream

  * `host`: address to a Docker instance, such as `/var/run/docker.sock` or `127.0.0.1:2375`.
  * `since`: Docker timestamp to start the event stream from
  * `cb`: called when the initial connection is established, or fails to be established

### EventStream#on('connection', function())

  Emitted when a connection to Docker is established.

### EventStream#on('reconnect', function(n, delay))

  Emitted when a reconnection will take place.

  * `n`: current reconnection count
  * `delay`: delay before reconnection

### EventStream#on('disconnect', function(err))

  Emitted when the connection to Docker is lost, with an optional error.

## Example

```js
var eventStream = require('docker-event-stream')

eventStream(function(err, stream) {
  if (err) throw err
  console.log('connected!')
  stream.on('data', console.log)
})
```

  Output:

```
connected!
{ status: 'create',
  id: 'a6180d6983f5e6e0a8df13b0db228081e68cc8d5ca81b8ad045bfc651bbf0d3d',
  from: '9bc6673ee5b5',
  time: 1424923014 }
{ status: 'start',
  id: 'a6180d6983f5e6e0a8df13b0db228081e68cc8d5ca81b8ad045bfc651bbf0d3d',
  from: '9bc6673ee5b5',
  time: 1424923014 }
{ status: 'die',
  id: 'a6180d6983f5e6e0a8df13b0db228081e68cc8d5ca81b8ad045bfc651bbf0d3d',
  from: '9bc6673ee5b5',
  time: 1424923016 }
{ status: 'destroy',
  id: 'a6180d6983f5e6e0a8df13b0db228081e68cc8d5ca81b8ad045bfc651bbf0d3d',
  from: '9bc6673ee5b5',
  time: 1424923017 }
```
