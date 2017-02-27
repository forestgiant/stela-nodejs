const test = require('tape');
const stela_api = require('./api.js');
const messages = require('./stela_pb');
const os = require('os');

const stelaAddress = stela_api.defaultStelaAddress;

test('Test connect', function (t) {
    const client = new stela_api(stelaAddress, '');
    client.connect()
        .then(() => {
            // Check if client is nil
            t.doesNotEqual(client, null);

            // Verify serverAddress
            t.equal(client.serverAddress, stelaAddress);

            // Verify hostname is correct
            t.equal(client.hostname, os.hostname());

            // Verify client id was set
            t.doesNotEqual(client.id, null);

            // We're finished close the client connect stream
            return client.close();
        }).then(() => {
            // Client closed, end test
            t.end();
        }).catch(error => {
            console.log(error);
            if (client.connectStream) {
                return client.close();
            }
        }).catch(error => {
            console.log(error);
        });
});

test('Test subscribe, register, and unsubscribe', function (t) {
    const serviceName = 'testSubscribe.services.fg';
    const client = new stela_api(stelaAddress, '');
    const service = new messages.ServiceMessage();
    service.setName(serviceName);
    service.setIpv4('127.0.0.1');
    service.setPort(10000);
    var returnedName = '';
    const subscribeCallback = (service) => {
        if (service.getAction() == stela_api.actions.RegisterAction) {
            returnedName = service.getName();
        }
    };

    client.connect()
        .then(() => {
            return client.subscribe(serviceName, subscribeCallback);
        }).then(() => {
            // verify callback was subscribed
            t.equal(client.callbacks.get(serviceName), subscribeCallback);

            // Register service
            return client.registerService(service);
        }).then(() => {
            // Now verify our subscription callback worked
            t.equal(returnedName, serviceName);

            // Unsubscribe
            return client.unsubscribe(serviceName);
        }).then(() => {
            return client.deregisterService(service);
        }).then(() => {
            // We're finished close the client connect stream
            return client.close();
        }).then(() => {
            // Client closed, end test
            t.end();
        }).catch(error => {
            console.log(error);
            if (client.connectStream) {
                client.close();
            }
        }).catch(error => {
            console.log(error);
        });
});

test('Test deregister and discover', function (t) {
    const serviceName = 'testRegister.services.fg';
    const client = new stela_api(stelaAddress, '');
    const service = new messages.ServiceMessage();
    service.setName(serviceName);
    service.setIpv4('127.0.0.1');
    service.setPort(10000);

    client.connect()
        .then(() => {
            // Register service
            return client.registerService(service);
        }).then(() => {
            // Discover to make sure the service was registered
            return client.discover(serviceName);
        }).then(services => {
            if (!services) {
                t.fail("services is null");
            }

            // Verify the services only returned one
            t.equal(services.length, 1);

            // Verify that the service returned is the one we registered
            t.equal(stela_api.servicesEqual(services[0], service), true);

            return client.deregisterService(service);
        }).then(() => {
            // Discover to make sure the service was deregistered
            // This should error
            return client.discover(serviceName);
        }).catch(error => {
            // discover should error since there are no services registred under that serviceName
            if (!error) {
                t.fail("discover should have errored");
            }
            console.log("close in test");
            // We're finished close the client connect stream
            return client.close();
        }).then(() => {
            console.log("close in test then");
            // We're finished close the client connect stream
            return client.close();
        }).then(() => {
            // Client closed, end test
            console.log("close in test end");
            t.end();
        }).catch(error => {
            console.log(error);
            if (client.connectStream) {
                client.close();
            }
        }).catch(error => {
            console.log(error);
        });
});

test('Test discoverRegex', function (t) {
    const serviceName = 'testDiscoverRegex.services.fg';
    const client = new stela_api(stelaAddress, '');
    const service = new messages.ServiceMessage();
    service.setName(serviceName);
    service.setIpv4('127.0.0.1');
    service.setPort(10000);

    client.connect()
        .then(() => {
            // Register service
            return client.registerService(service);
        }).then(() => {
            // discoverRegex
            return client.discoverRegex("testDiscoverReg.*");
        }).then(services => {
            if (!services) {
                t.fail("services is null");
            }

            // Verify the services only returned one
            t.equal(services.length, 1);

            // Verify that the service returned is the one we registered
            t.equal(stela_api.servicesEqual(services[0], service), true);

            // deregister service
            return client.deregisterService(service);
        }).then(() => {
            // We're finished close the client connect stream
            return client.close();
        }).then(() => {
            // Client closed, end test
            t.end();
        }).catch(error => {
            console.log(error);
            if (client.connectStream) {
                client.close();
            }
        }).catch(error => {
            console.log(error);
        });
});

test('Test discoverOne', function (t) {
    const serviceName = 'testDiscoverRegex.services.fg';
    const client = new stela_api(stelaAddress, '');
    const service = new messages.ServiceMessage();
    service.setName(serviceName);
    service.setIpv4('127.0.0.1');
    service.setPort(10000);

    client.connect()
        .then(() => {
            // Register service
            return client.registerService(service);
        }).then(() => {
            // discoverOne
            return client.discoverOne(serviceName);
        }).then((returnedService) => {
            if (!returnedService) {
                t.fail("returnedService is null");
            }

            // Verify that the service returned is the one we registered
            t.equal(stela_api.servicesEqual(returnedService, service), true);

            // deregister service
            return client.deregisterService(service);
        }).then(() => {
            // We're finished close the client connect stream
            return client.close();
        }).then(() => {
            // Client closed, end test
            t.end();
        }).catch(error => {
            console.log(error);
            if (client.connectStream) {
                client.close();
            }
        }).catch(error => {
            console.log(error);
        });
});

test('Test discoverAll', function (t) {
    const client = new stela_api(stelaAddress, '');
    var testServices = [];
    var totalRegistered = 5;
    for (i = 0; i < totalRegistered; i++) {
        const service = new messages.ServiceMessage();
        service.setName('testDiscoverAll' + i + '.services.fg');
        service.setIpv4('127.0.0.1');
        service.setPort(10000 + i);

        // Add to array of testServices
        testServices.push(service);
    }


    client.connect()
        .then(() => {
            var registerPromises = [];
            testServices.forEach(function (item, index, array) {
                registerPromises.push(client.registerService(item));
            });

            // Register test services
            return Promise.all(registerPromises);
        }).then(() => {
            // discoverRegex
            return client.discoverAll();
        }).then(services => {
            if (!services) {
                t.fail("services is null");
            }

            // Verify that the service returned contain the ones we registered
            // Add one to totalRegistered because stela instances register themselve
            t.equal(services.length, totalRegistered + 1);

            // deregister services
            var deregisterPromises = [];
            testServices.forEach(function (item, index, array) {
                deregisterPromises.push(client.deregisterService(item));
            });

            // Register test services
            return Promise.all(deregisterPromises);
        }).then(() => {
            // We're finished close the client connect stream
            return client.close();
        }).then(() => {
            // Client closed, end test
            t.end();
        }).catch(error => {
            console.log(error);
            if (client.connectStream) {
                client.close();
            }
        }).catch(error => {
            console.log(error);
        });
});