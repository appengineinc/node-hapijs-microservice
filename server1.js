'use strict';


const Hapi = require('hapi');
const controller = require('./controller');
const config = require('./config');

const server = new Hapi.Server();

//server with redis caching..not quite working so commented out
/*const server = new Hapi.Server(3000, "localhost", {
    cache: {
        engine: require("catbox-redis"),
        options: {
            host: "localhost",
            partition: "MyApp",
            password: "mypassword"
        }
    }
});*/


//configure server info
const configOptions = {
            "host":"127.0.0.1",
            "port":3000,
            "labels":[
                "server1","api1"]
        };

//configure logger files and path 
const loggerOptions = {
            "logfile":"log/error_server1.log",
            "opslogfile":"ops_server1.log",
            "path":"./log"
        };

//for debuging
//console.log(config(configOptions).getConnectionConfig());

server.connection(config(configOptions).getConnectionConfig());

//register a controller that defines the routes
server.register([config(loggerOptions).getLoggerConfig(), { register: controller, options: {} }], (err) => {

    server.start((err) => {
        console.log(`Server running at ${server.info.uri}`);
    });
});



