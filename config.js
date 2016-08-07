///service/access/config.js

'use strict';

const Good = require('good');

module.exports = function setConfigOptions (options) {
    return {
        "getConnectionConfig" : function() {
                return getconnectionconfig(options); },
        "getLoggerConfig" : function() {
                return getloggerconfig(options); } 
    }
    
}


function getconnectionconfig(options) {
    return  {
        "port": options.port,
        "host": options.host, 
        "routes": {
            "cors": {
                additionalHeaders: ['Access-Control-Allow-Origin']   
            },
            "timeout": {
                server: 10000
            }
        },
        "labels": options.labels

    }
    
}; 

function getloggerconfig(options) {
    return {
                "register": Good,
                "options": {
                     reporters: {
                        console: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{log: '*', response: '*' }] 
                        }, {
                            module: 'good-console'
                        }, 'stdout'],
                        file: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ "error": "*" }]
                        }, {
                            module: 'good-squeeze',
                            name: 'SafeJson'
                        }, {
                                module: 'rotating-file-stream',
                                args: [
                                    options.logfile,
                                    {
                                        size: '1000B',
                                        path: options.path
                                    }
                                ]}
                              ],
                         file: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ response: '*', log: '*'}]
                        }, {
                            module: 'good-squeeze',
                            name: 'SafeJson'
                        },{
                            module: 'rotating-file-stream',
                            args: [
                                options.opslogfile,
                                {
                                    size: '1000B',
                                    path: options.path
                                }
                            ]}
                        ],
                        http: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ error: '*' }]
                        }, {
                            module: 'good-http',
                            args: ['http://prod.logs:3000', {
                                wreck: {
                                    headers: { 'x-api-key': 12345 }
                                }
                            }]
                        }]
                    }
            
        }
    
    }
};

