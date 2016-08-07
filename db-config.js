///service/access/db-config.js

'use strict';

var db = {
    user:"---",
    password:"---",
    port:"27017",
    host:"localhost"
};


var config = {
    "url": "mongodb://" + db.user + ":" + db.password + "@" + db.host + ":" + db.port,
    "defaults": {
        "db":"youoh"
    }
};

exports.config = config;

    