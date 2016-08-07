'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const DBconfig = require('../db-config');

//config the list of collections for this service
const collectionsCfg = {
    "collections": {
        "accounts":"accounts"
    }
}
/**
 * Handles a POST call to /login 
 */
exports.handleLoginRequest = (req) => {
    return new Promise(
        (resolve, reject) => {
            
            dbTask(req,(db,payload)=> {
                return new Promise(
                    (resolve, reject) => {
                        
                        //find a account     
                        db.collection(collectionsCfg.collections.accounts)
                            .findOne({  "username" : payload.username, "password":payload.password }, function(err, result) {
                            if (err) 
                                reject(err);
                            
                            //get account info
                            var accountInfo = {
                                active: result.active,
                                id: result._id 
                            }
                            
                            resolve(accountInfo);
                        });                        
                        
                    });
            })
            .then(value => {
                resolve(value);
            })
            .catch(error => {
                reject(error);
            });
            
        });
};


/**
 * Handles a GET call to /login?name={name} 
 */
exports.testGetHandler = (req) => {
    //for testing 
    var result = "testGetHandler";    
    return result;
};

function dbTask(req, asyncFunc) {
    return new Promise(
         (resolve, reject) => {
            
             var dbUrl = DBconfig.config.url + "/" + (req.db? req.db : DBconfig.config.defaults.db); 
             
            //get a connection
            MongoClient.connect(dbUrl, function(err, db) {
                assert.equal(null, err);
                //console.log("Connected correctly to db server");
                
                //no error, so proceed
                asyncFunc(db,req.msg)
                    .then(value => {resolve(value);})
                    .then(
                    () => { 
                        db.close();
                    })
                    .catch(error => { db.close(); reject(error) });
                
            });

        });
    
        
}


