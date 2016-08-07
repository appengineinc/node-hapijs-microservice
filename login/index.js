'use strict';
const Config = require('./endpointcfg'); // define my services here

const routes = [
    {  
      method:'POST',
      path:'/login',
      config: Config.handleLoginRequest // config a microserver for this endpoint
   },
    {  
      method:'GET',
      path:'/login',
      config: Config.testGetHandler // config a microserver for this endpoint
   }];


exports.register = function (server, options, next) {
    server.route(routes); //add services to the server
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};

