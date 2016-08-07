'use strict';

const Hapi = require('hapi');
//const controller = require('./controller');
const loginmicroservice = require('./login/index');
const config = require('./config');
//db
//const MongoDB = require('hapi-mongodb'); .. tried but decided not to use: 
//reason: need to access db outside of the request and server, server shouldnt know about the db

//error handler
//const Boom = require('boom');

const server = new Hapi.Server();

const configOptions = {
            "host":"127.0.0.1",
            "port":4000,
            "labels":[
                "server2","api2"]
        };

const loggerOptions = {
            "logfile":"log/error_server2.log",
            "opslogfile":"ops_server2.log",
            "path":"./log"
        };

//console.log(config(configOptions).getConnectionConfig());

server.connection(config(configOptions).getConnectionConfig());

server.register([config(loggerOptions).getLoggerConfig(), { register: loginmicroservice, options: {} }], (err) => {

    server.start((err) => {
        console.log(`Server running at ${server.info.uri}`);
    });
});



