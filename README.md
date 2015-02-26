# docker-event-stream

  The Docker event stream as a node stream.

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

