'use strict';

const Joi = require('joi');
const Services = require('./services'); //microservices implemention goes here 
const Config = require('./services-dbcfg'); // db config for the services goes here 
const Boom = require('boom'); // this is like BOOM ! 


/**
 * Handles a login request
 */
var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

exports.handleLoginRequest = {  
    validate: {
        payload: {
                username: Joi.string().email().regex(emailRegex).required(), //joi .email() doesnt do a complete email validation
                password: Joi.string().regex(/^[0-9]{4}$/).required() 
        }
    },
    handler: (request, reply) => {
        
            //pass in db to be used by this service ( each microservices may use a different databases ) 
            Services.handleLoginRequest({
                msg:request.payload,
                db:Config.services["handleLoginRequest"].db //loookup db base on the service name
            })
            .then(value => {
                reply(value);
            })
            .catch(error => {
                reply(Boom.internal('Internal DB error', error)); // boom seem cool, so lets use it here
            });
        
            },
    cors: true
    
};

/**
 * Handles a GeT request ??? jut for testing runnig a second service 
 */
exports.testGetHandler = {  
    validate: {
        query:{  
               name:Joi.string()
        }
    },
    handler: (request, reply) => {
        
            //pass in db to be used by this service
            var result = Services.testGetHandler({
                msg:request.query.name,
                db:Config.services["any"].db // uses the default db for any service
            });
            reply(result);
            },
    cors: true      
    
};

