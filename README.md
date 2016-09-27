# nodemysqlslave
Listing MySql Replication Slave Status 

#File config.json
File config.json
Example : 
```lua
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
```lua
