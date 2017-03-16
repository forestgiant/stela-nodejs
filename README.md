## Stela Client
This package provides a StelaClient which can be used to communicate with a [Stela server](https://github.com/forestgiant/stela) using the gRPC protocol and Node.js.  With the exception of the `Close` method, which finishes immediately, the methods make use of Promises to return response objects.

### Constructor
Used to obtain a new StelaClient object.
```
constructor(serverAddress, caFile, keyFile, certFile) {...}
```

### Connect
Creates a unidirectional stream from the gRPC to this client.  You may pass in a function `errorCallback` to be called if there is an error with the gRPC server stream and returns a promise.
```
connect(errorCallback) {...}
```

### Close
Cleans up the client's connection and nulls out some of the variables the client uses.
```
close() {...}
```

### Register
Makes a gRPC request to register a service to the stela instance the client is connected to. This method expects to receive a `ServiceMessage` and returns a promise.
```
register(service) {...}
```

### Deregister
Makes a gRPC request to deregister a service to the stela instance the client is connected to. This method expects to receive a `ServiceMessage` and returns a promise.
```
register(service) {...}
```

### Discover
Makes a gRPC request to discover services registered with the same service name. This method expects to receive a `serviceName` and returns a promised array of `ServiceMessage`.
```
discover(serviceName) {...}
```

### Discover w/ Regular Expressions
Makes a gRPC request to find services by name based on a regular expression. This method expects to receive a `serviceName` and returns a promised array of `ServiceMessage`.
```
discoverRegex(reg) {...}
```

### Discover One
Makes a gRPC request to discover a single instance of a service based on name. This method expects to receive a `serviceName` and returns a promised `ServiceMessage`.
```
discoverOne(serviceName) {...}
```

### Discover All
Makes a gRPC request to discover *all* services registered with *all* Stela instances. Returns a promised array of `ServiceMessage`.
```
discoverAll(){...}
```

### 

### Subscribe
Makes a gRPC request indicating that the client wishes to receive all updates for the given service name over a stream.  This method expects to receive a `serviceName`, and a callback function `handler` that will be invoked when an update is received for any service registered with that `serviceName`. It returns a promise.
```
subscribe(serviceName, callback) {...}
```

### Unsubscribe
Makes a gRPC request indicating that the client should stop realying updates for the given `serviceName` to the specified handler and returns a promise.
```
unsubscribe(serviceName) {...}
```


