'use strict';

var routes = require('./routes');

exports.register = function (server, options, next) {
    server.route(routes(options));
    next();
};

exports.register.attributes = {
    //name: 'some_name'
    pkg: require('./package.json')
};



