# nodemysqlslave
Listing MySql Replication Slave Status 

## Introduction

This is a node.js application that check the replication status for mysql slave.
You can connect to the specified port (default 3615) for a list of MySQL synchronized slaves (JSON).

##File config.json
File config.json
Example : 
```js
-- File config.json
{
    "log" : true,
    "onlylocalhost" : false,
    "listenTo" : 3615,
    "user": "slavestatus",
    "password": "TheDevilIsWatchingYou",
    "master": {
        "host": "localhost",
        "port": 3306
    },
    "slaves": [
        {
            "host": "dbSlave1",
            "port": 3306,
            "state": 0
        },
        {
            "host": "dbSlave2",
            "port": 3306,
            "state": 0
        }
    ]
}
```
