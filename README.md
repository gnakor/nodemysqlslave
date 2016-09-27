# nodemysqlslave
List MySql Replication Slave 

#File config.json
File config.json
Example : 
{
    user: 'toto',
    password: 'toto',
    database: '',
    master: {
        host: "MASTER_HOST",
        port: 3306
    },
    slaves: [
        {
            host: "SLAVE1_HOST",
            port: 3306,
            state: 0
        },
        {db: null,
            host: "SLAVE1_HOST",
            port: 3306,
            state: 0
        }
    ]
};
