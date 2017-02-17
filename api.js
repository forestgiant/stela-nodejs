const os = require('os');
const grpc = require('grpc');
const messages = require('./stela_pb');
const services = require('./stela_grpc_pb');


class StelaClient {
  /**
   * Creates a new stela client used to communicate with a stela server via gRPC.
   * @param {string} serverAddress - IPv4 and Port of the stela server you want to communicate with.
   * @param {string} caFile - Certificate authority file to use for gRPC connections.
   * @constructor
   */
  constructor(serverAddress, caFile) {
    this.serverAddress = serverAddress;
    this.hostname = os.hostname();
    this.address = externalIP();
    this.callbacks = new Map(); // a map of callback functions keyed by serviceName

    // Check if a caFile was passed, if not use insecure connection
    if (!caFile || caFile == '') {
      this.creds = grpc.credentials.createInsecure();
    } else {
      this.creds = grpc.credentials.createSsl(caFile);
    }
  }

  /**
   * connect creates a unidirectional stream from the gRPC to this client. 
   * @param {function} errorCallback Called when there is an error with the gRPC server stream
   * @return {Promise}
   */
  connect(errorCallback) {
    return new Promise((resolve, reject) => {
      if (this.serverAddress == '') {
        reject(Error("You must provide a server address to connect to."));
        return;
      }
      this.rpc = new services.StelaClient(this.serverAddress, this.creds);
      const clientRequest = new messages.AddClientRequest();
      clientRequest.setClientAddress(this.address);
      this.rpc.addClient(clientRequest, (err, response) => {
        if (err) {
          reject(Error("Failed to connect to Stela server at " + this.serverAddress));
          return;
        } else {
          this.id = response.getClientId();

          // After we get a client ID connect to the server
          const connectRequest = new messages.ConnectRequest();
          connectRequest.setClientId(response.getClientId());
          this.connectStream = this.rpc.connect(connectRequest);

          // Listen for any services registered that we're subscribed to
          this.connectStream.on('data', (service) => {
            // Call handler based on service
            const cb = this.callbacks.get(service.getName());
            if (cb) {
              cb(service);
            }
          });
          this.connectStream.on('error', (err) => {
            if (errorCallback) {
              errorCallback(err);
            }
          });
          resolve();
        }
      });
    });
  }

  /**
   * subscribe stores a callback to the service name and notifies the stela 
   * instance to notify your client on changes. 
   * @param {string} serviceName The name of the service you want to subscribe to.
   * @param {function} callback Called when a service is registered or deregistered 
   * with the same name property as the serviceName you subscribed to.
   * @return {Promise}
   */
  subscribe(serviceName, callback) {
    return new Promise((resolve, reject) => {
      if (!serviceName || serviceName == '') {
        reject(Error("You must provide a serviceName to subscribe"));
        return;
      }
      if (!callback) {
        reject(Error("You must provide a callback"));
        return;
      }

      const request = new messages.SubscribeRequest();
      request.setClientId(this.id);
      request.setServiceName(serviceName);
      this.rpc.subscribe(request, (err, response) => {
        if (err) {
          reject(Error("Failed to subscribe: " + err));
          return;
        } else {
          // Add subscribe callback to map of callbacks
          this.callbacks.set(serviceName, callback);
          resolve();
        }
      });
    });
  }

  /**
   * unsubscribe removes the callback to the service name and let's the stela instance know the client
   * doesn't want updates on that serviceName. 
   * @param {string} serviceName The name of the service you want to unsubscribe to.
   * @return {Promise}
   */
  unsubscribe(serviceName) {
    return new Promise((resolve, reject) => {
      if (!serviceName || serviceName == '') {
        reject(Error("You must provide a serviceName to unsubscribe"));
        return;
      }

      const request = new messages.UnsubscribeRequest();
      request.setClientId(this.id);
      this.rpc.unsubscribe(request, (err, response) => {
        if (err) {
          reject(Error("Failed to unsubscribe: " + err));
          return;
        } else {
          // Remove key from callback
          this.callbacks.delete(serviceName);
          resolve();
        }
      });
    });
  }

  /**
   * registerService registers a service to the stela instance the client is connected to.
   * @param {messages.ServiceMessage} service The service to be registered.
   * @return {Promise}
   */
  registerService(service) {
    return new Promise((resolve, reject) => {
      if (!service) {
        reject(Error("You must provide a service to register"));
        return;
      }

      service.setHostname(this.hostname);
      if (service.getIpv4() == "") {
        service.setIpv4(this.address);
      }

      const request = new messages.RegisterRequest();
      request.setClientId(this.id);
      request.setService(service);
      this.rpc.register(request, (err, response) => {
        if (err) {
          reject(Error("Failed to registerService: " + err));
          return;
        } else {
          resolve();
        }
      });

    });
  }

  /**
   * deregisterService deregisters a service to the stela instance the client is connected to.
   * @param {messages.ServiceMessage} service The service to be registered.
   * @return {Promise}
   */
  deregisterService(service) {
    return new Promise((resolve, reject) => {

      resolve();
    });
  }

  /**
   * discover services registered with the same service name.
   */
  discover() {
    return new Promise((resolve, reject) => {

      resolve();
    });
  }

  //
  discoverRegex() {
    return new Promise((resolve, reject) => {

      resolve();
    });
  }

  //
  discoverOne() {
    return new Promise((resolve, reject) => {

      resolve();
    });
  }

  //
  discoverAll() {
    return new Promise((resolve, reject) => {

      resolve();
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      if (!this.connectStream) {
        reject(Error("Client isn't connected"));
      }

      this.connectStream.cancel();
      resolve();
    });
  }
}

function externalIP() {
  var addrs = os.networkInterfaces();
  var address = '127.0.0.1';

  for (var key in addrs) {
    for (var k in addrs[key]) {
      if (addrs[key][k].family == 'IPv4') {
        // Check if loopback address
        var re = /^(127\.[\d.]+|[0:]+1|localhost)$/;
        var result = addrs[key][k].address.match(re);
        if (result == null) {
          return addrs[key][k].address;
        }
      }
    }
  }

  return address;
}

module.exports = StelaClient;