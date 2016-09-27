var net = require('net');
var sys = require('./sys.js');
var args = process.argv.slice(2);

var configfile = (args[0]) ? args[0] : 'config.json';
configfile = ((configfile.substr(0,1)!='/' && configfile.substr(0,1)!='.') ? './' : '') + configfile;
var config = require(configfile);
var log = config.log;

function initSlave(i) {
    var slave = config.slaves[i];
    if (slave.state == 0) {
        var mysql = require('mysql');
        config.slaves[i].db = null;
        config.slaves[i].replicationErrors = 0;
        var options = {user: config.user, host: slave.host, password: config.password};
        config.slaves[i].db = mysql.createConnection(options);
        config.slaves[i].db.connect();
        if (log)
            sys.log('initSlave', 'connect', options);
        config.slaves[i].db.on('error', function (err) {
            config.slaves[i].state = 0;
            if (log)
                sys.log('initSlave', 'sql error', 'err', err);
        });
        config.slaves[i].state = 1;
        setInterval(function () {
            config.slaves[i].db.query('SHOW SLAVE STATUS', function (err, rows, fields) {
                if (err) {
                    //throw err;                    
                } else {                    
                    if (!rows[0] || rows[0].Seconds_Behind_Master != 0) {
                        config.slaves[i].replicationErrors++;
                        if (config.slaves[i].replicationErrors>3){
                            config.slaves[i].state = 2;
                            if (log)
                                sys.log(slave.host, 'error replication ', rows[0].Seconds_Behind_Master);
                        }
                    }else{
                        config.slaves[i].state = 1;
                        config.slaves[i].replicationErrors = 0;
                    }
                }
            });
        }, 100);
    } else {
        if (log)
            sys.log('initSlave', 'connect', options);
    }
};
for (var i = 0; i < config.slaves.length; i++) {
    initSlave(i);
}

process.on('SIGINT', function () {
    process.exit();
});
process.on('exit', function() {    
    for (var i = 0; i < config.slaves.length; i++) {
        if (config.slaves[i].db){
            config.slaves[i].db.end();
            if (log)
                sys.log('process exit', config.slaves[i].host, 'close');
        }
    }
});

function getSlavesList(){
    var data = {
        master : config.master,
        slaves : []
    }
    for (var i = 0; i < config.slaves.length; i++) {
        if (config.slaves[i].state==1){
            data.slaves.push({'host':config.slaves[i].host, 'port':config.slaves[i].port});
        }
    }    
    if (log)
        sys.log('getSlavesList : ', JSON.stringify(data));
    return JSON.stringify(data);
}

var net = require('net');
var server = net.createServer(function(socket) {
    var data = getSlavesList();
    socket.write(data);
    socket.pipe(socket);
    socket.end();
    if (log)
        sys.log('server connection => '+data);
});
var localhost = (config.onlylocalhost) ? '127.0.0.1' : null;
server.listen(config.listenTo, localhost);
