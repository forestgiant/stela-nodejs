const test = require('tape');
const stela_api = require('./api.js');
const messages = require('./stela_pb');
const os = require('os');

test('Test connect', function (t) {
    const serverAddress = 'localhost:31000';
    const client = new stela_api(serverAddress, '');
    client.connect()
        .then((response) => {
            // Check if client is nil
            t.doesNotEqual(client, null);

            // Verify serverAddress
            t.equal(client.serverAddress, serverAddress);

            // Verify hostname is correct
            t.equal(client.hostname, os.hostname());

            // Verify client id was set
            t.doesNotEqual(client.id, null);

            // We're finished close the client connect stream
            return client.close();
        }).then(() => {
            // Client closed, end test
            t.end();
        }).catch((error) => {
            console.log(error);
            if (client.connectStream) {
                return client.close();
            }
        }).catch((error) => {
            console.log(error);
        });
});

test('Test subscribe', function (t) {
    const serverAddress = 'localhost:31000';
    const serviceName = 'testSubscribe.services.fg';
    const client = new stela_api(serverAddress, '');
    var returnedName = '';
    const subscribeCallback = (service) => {
        returnedName = service.getName();
    };

    client.connect()
        .then((response) => {
            return client.subscribe(serviceName, subscribeCallback);
        }).then(() => {
            // verify callback was subscribed
            t.equal(client.callbacks.get(serviceName), subscribeCallback);

            // Register service
            const service = new messages.ServiceMessage();
            service.setName(serviceName);
            service.setIpv4('127.0.0.1');
            service.setPort(10000);
            return client.registerService(service);
        }).then(() => {
            // Now verify our subscription callback worked
            t.equal(returnedName, serviceName);

            // We're finished close the client connect stream
            return client.close();
        }).then(() => {
            // Now verify our subscription callback worked

            // Client closed, end test
            t.end();
        }).catch((error) => {
            console.log(error);
            if (client.connectStream) {
                client.close();
            }
        }).catch((error) => {
            console.log(error);
        });
});
