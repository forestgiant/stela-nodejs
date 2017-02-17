// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var stela_pb = require('./stela_pb.js');

function serialize_stela_pb_AddClientRequest(arg) {
  if (!(arg instanceof stela_pb.AddClientRequest)) {
    throw new Error('Expected argument of type stela.pb.AddClientRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_AddClientRequest(buffer_arg) {
  return stela_pb.AddClientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_AddClientResponse(arg) {
  if (!(arg instanceof stela_pb.AddClientResponse)) {
    throw new Error('Expected argument of type stela.pb.AddClientResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_AddClientResponse(buffer_arg) {
  return stela_pb.AddClientResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_ConnectRequest(arg) {
  if (!(arg instanceof stela_pb.ConnectRequest)) {
    throw new Error('Expected argument of type stela.pb.ConnectRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_ConnectRequest(buffer_arg) {
  return stela_pb.ConnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_DiscoverAllRequest(arg) {
  if (!(arg instanceof stela_pb.DiscoverAllRequest)) {
    throw new Error('Expected argument of type stela.pb.DiscoverAllRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_DiscoverAllRequest(buffer_arg) {
  return stela_pb.DiscoverAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_DiscoverRequest(arg) {
  if (!(arg instanceof stela_pb.DiscoverRequest)) {
    throw new Error('Expected argument of type stela.pb.DiscoverRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_DiscoverRequest(buffer_arg) {
  return stela_pb.DiscoverRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_DiscoverResponse(arg) {
  if (!(arg instanceof stela_pb.DiscoverResponse)) {
    throw new Error('Expected argument of type stela.pb.DiscoverResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_DiscoverResponse(buffer_arg) {
  return stela_pb.DiscoverResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_NotifyResponse(arg) {
  if (!(arg instanceof stela_pb.NotifyResponse)) {
    throw new Error('Expected argument of type stela.pb.NotifyResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_NotifyResponse(buffer_arg) {
  return stela_pb.NotifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_RegisterRequest(arg) {
  if (!(arg instanceof stela_pb.RegisterRequest)) {
    throw new Error('Expected argument of type stela.pb.RegisterRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_RegisterRequest(buffer_arg) {
  return stela_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_RegisterResponse(arg) {
  if (!(arg instanceof stela_pb.RegisterResponse)) {
    throw new Error('Expected argument of type stela.pb.RegisterResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_RegisterResponse(buffer_arg) {
  return stela_pb.RegisterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_ServiceMessage(arg) {
  if (!(arg instanceof stela_pb.ServiceMessage)) {
    throw new Error('Expected argument of type stela.pb.ServiceMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_ServiceMessage(buffer_arg) {
  return stela_pb.ServiceMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_SubscribeRequest(arg) {
  if (!(arg instanceof stela_pb.SubscribeRequest)) {
    throw new Error('Expected argument of type stela.pb.SubscribeRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_SubscribeRequest(buffer_arg) {
  return stela_pb.SubscribeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stela_pb_SubscribeResponse(arg) {
  if (!(arg instanceof stela_pb.SubscribeResponse)) {
    throw new Error('Expected argument of type stela.pb.SubscribeResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_stela_pb_SubscribeResponse(buffer_arg) {
  return stela_pb.SubscribeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var StelaService = exports.StelaService = {
  addClient: {
    path: '/stela.pb.Stela/AddClient',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.AddClientRequest,
    responseType: stela_pb.AddClientResponse,
    requestSerialize: serialize_stela_pb_AddClientRequest,
    requestDeserialize: deserialize_stela_pb_AddClientRequest,
    responseSerialize: serialize_stela_pb_AddClientResponse,
    responseDeserialize: deserialize_stela_pb_AddClientResponse,
  },
  connect: {
    path: '/stela.pb.Stela/Connect',
    requestStream: false,
    responseStream: true,
    requestType: stela_pb.ConnectRequest,
    responseType: stela_pb.ServiceMessage,
    requestSerialize: serialize_stela_pb_ConnectRequest,
    requestDeserialize: deserialize_stela_pb_ConnectRequest,
    responseSerialize: serialize_stela_pb_ServiceMessage,
    responseDeserialize: deserialize_stela_pb_ServiceMessage,
  },
  subscribe: {
    path: '/stela.pb.Stela/Subscribe',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.SubscribeRequest,
    responseType: stela_pb.SubscribeResponse,
    requestSerialize: serialize_stela_pb_SubscribeRequest,
    requestDeserialize: deserialize_stela_pb_SubscribeRequest,
    responseSerialize: serialize_stela_pb_SubscribeResponse,
    responseDeserialize: deserialize_stela_pb_SubscribeResponse,
  },
  unsubscribe: {
    path: '/stela.pb.Stela/Unsubscribe',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.SubscribeRequest,
    responseType: stela_pb.SubscribeResponse,
    requestSerialize: serialize_stela_pb_SubscribeRequest,
    requestDeserialize: deserialize_stela_pb_SubscribeRequest,
    responseSerialize: serialize_stela_pb_SubscribeResponse,
    responseDeserialize: deserialize_stela_pb_SubscribeResponse,
  },
  register: {
    path: '/stela.pb.Stela/Register',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.RegisterRequest,
    responseType: stela_pb.RegisterResponse,
    requestSerialize: serialize_stela_pb_RegisterRequest,
    requestDeserialize: deserialize_stela_pb_RegisterRequest,
    responseSerialize: serialize_stela_pb_RegisterResponse,
    responseDeserialize: deserialize_stela_pb_RegisterResponse,
  },
  deregister: {
    path: '/stela.pb.Stela/Deregister',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.RegisterRequest,
    responseType: stela_pb.RegisterResponse,
    requestSerialize: serialize_stela_pb_RegisterRequest,
    requestDeserialize: deserialize_stela_pb_RegisterRequest,
    responseSerialize: serialize_stela_pb_RegisterResponse,
    responseDeserialize: deserialize_stela_pb_RegisterResponse,
  },
  notifyClients: {
    path: '/stela.pb.Stela/NotifyClients',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.ServiceMessage,
    responseType: stela_pb.NotifyResponse,
    requestSerialize: serialize_stela_pb_ServiceMessage,
    requestDeserialize: deserialize_stela_pb_ServiceMessage,
    responseSerialize: serialize_stela_pb_NotifyResponse,
    responseDeserialize: deserialize_stela_pb_NotifyResponse,
  },
  discover: {
    path: '/stela.pb.Stela/Discover',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.DiscoverRequest,
    responseType: stela_pb.DiscoverResponse,
    requestSerialize: serialize_stela_pb_DiscoverRequest,
    requestDeserialize: deserialize_stela_pb_DiscoverRequest,
    responseSerialize: serialize_stela_pb_DiscoverResponse,
    responseDeserialize: deserialize_stela_pb_DiscoverResponse,
  },
  discoverRegex: {
    path: '/stela.pb.Stela/DiscoverRegex',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.DiscoverRequest,
    responseType: stela_pb.DiscoverResponse,
    requestSerialize: serialize_stela_pb_DiscoverRequest,
    requestDeserialize: deserialize_stela_pb_DiscoverRequest,
    responseSerialize: serialize_stela_pb_DiscoverResponse,
    responseDeserialize: deserialize_stela_pb_DiscoverResponse,
  },
  discoverOne: {
    path: '/stela.pb.Stela/DiscoverOne',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.DiscoverRequest,
    responseType: stela_pb.ServiceMessage,
    requestSerialize: serialize_stela_pb_DiscoverRequest,
    requestDeserialize: deserialize_stela_pb_DiscoverRequest,
    responseSerialize: serialize_stela_pb_ServiceMessage,
    responseDeserialize: deserialize_stela_pb_ServiceMessage,
  },
  discoverAll: {
    path: '/stela.pb.Stela/DiscoverAll',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.DiscoverAllRequest,
    responseType: stela_pb.DiscoverResponse,
    requestSerialize: serialize_stela_pb_DiscoverAllRequest,
    requestDeserialize: deserialize_stela_pb_DiscoverAllRequest,
    responseSerialize: serialize_stela_pb_DiscoverResponse,
    responseDeserialize: deserialize_stela_pb_DiscoverResponse,
  },
  // Peer related RPC is used to request all peer members
  peerDiscover: {
    path: '/stela.pb.Stela/PeerDiscover',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.DiscoverRequest,
    responseType: stela_pb.DiscoverResponse,
    requestSerialize: serialize_stela_pb_DiscoverRequest,
    requestDeserialize: deserialize_stela_pb_DiscoverRequest,
    responseSerialize: serialize_stela_pb_DiscoverResponse,
    responseDeserialize: deserialize_stela_pb_DiscoverResponse,
  },
  peerDiscoverRegex: {
    path: '/stela.pb.Stela/PeerDiscoverRegex',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.DiscoverRequest,
    responseType: stela_pb.DiscoverResponse,
    requestSerialize: serialize_stela_pb_DiscoverRequest,
    requestDeserialize: deserialize_stela_pb_DiscoverRequest,
    responseSerialize: serialize_stela_pb_DiscoverResponse,
    responseDeserialize: deserialize_stela_pb_DiscoverResponse,
  },
  peerDiscoverOne: {
    path: '/stela.pb.Stela/PeerDiscoverOne',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.DiscoverRequest,
    responseType: stela_pb.ServiceMessage,
    requestSerialize: serialize_stela_pb_DiscoverRequest,
    requestDeserialize: deserialize_stela_pb_DiscoverRequest,
    responseSerialize: serialize_stela_pb_ServiceMessage,
    responseDeserialize: deserialize_stela_pb_ServiceMessage,
  },
  peerDiscoverAll: {
    path: '/stela.pb.Stela/PeerDiscoverAll',
    requestStream: false,
    responseStream: false,
    requestType: stela_pb.DiscoverAllRequest,
    responseType: stela_pb.DiscoverResponse,
    requestSerialize: serialize_stela_pb_DiscoverAllRequest,
    requestDeserialize: deserialize_stela_pb_DiscoverAllRequest,
    responseSerialize: serialize_stela_pb_DiscoverResponse,
    responseDeserialize: deserialize_stela_pb_DiscoverResponse,
  },
};

exports.StelaClient = grpc.makeGenericClientConstructor(StelaService);
