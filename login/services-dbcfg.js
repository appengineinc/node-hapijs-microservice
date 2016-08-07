///server/access/services-dbcfg.js
'user-strict'

//set the name of the database to be used by the service, and defaultdb for  any service 
var defaultDb = "youoh";

module.exports = {
    "services": {
        "handleLoginRequest": {"db":"youoh"},
        "any":{"db":defaultDb}
    }
}
