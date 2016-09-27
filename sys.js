(function() {

    var sys = {};
    sys.log = function() {
        var s = "";
        var d = new Date();
        s = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        s += ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
        s += ':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
        s += ' ';
        if (d.getMilliseconds() < 10)
            s += '00' + d.getMilliseconds();
        else if (d.getMilliseconds() < 100)
            s += '0' + d.getMilliseconds();
        else
            s += d.getMilliseconds();
        for (var i = 0; i < arguments.length; i++) {
            s += '\t' + arguments[i];
        }
        console.log(s);
    };
    sys.daylog = function() {
        var s = "";
        var d = new Date();
        var mth = d.getMonth() + 1;
        s = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
        s += ' ' + (mth < 10 ? '0' + mth : mth);
        s += ' ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours())
        s += ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
        s += ':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
        s += ' ';
        if (d.getMilliseconds() < 10)
            s += '00' + d.getMilliseconds();
        else if (d.getMilliseconds() < 100)
            s += '0' + d.getMilliseconds();
        else
            s += d.getMilliseconds();
        for (var i = 0; i < arguments.length; i++) {
            s += '\t' + arguments[i];
        }
        console.log(s);
    };
    sys.gmt = function() {
        return Math.floor(new Date().getTime() / 1000);
    };
    sys.time = function() {
        return new Date().getTime();
    };
    sys.int2Arr = function(arr, idx, val, nb, info) {
        var ival = val;
        if (info) {
            sys.log('sys.int2Arr', info, 'arr', idx, val);
        }
        if (!nb)
            nb = 1;
        for (var i = 0; i < nb; i++) {
            arr[idx + i] = 0;
        }
        var i = 0;
        do {
            var lval = val;
            arr[idx + i] = val % 256;
            val = Math.floor(val / 256);
            if (info) {
                sys.log('sys.int2Arr', info, 'arr', (idx + i), lval, val);
            }
            i++;
        } while (val > 256)
    };
    sys.str2Arr = function(arr, idx, str) {
        for (var i = 0; i < str.length; i++) {
            arr[idx + i] = str.charCodeAt(i);
        }
    };
    sys.int2SArr = function(val, nb, info) {
        var ival = val;
        if (!nb)
            nb = 1;
        var arr = [];
        for (var i = 0; i < nb; i++) {
            arr[i] = 0;
        }
        var i = 0;
        do {
            arr[i] = val % 256;
            val = Math.floor(val / 256);
            i++;
        } while (val > 256)
        if (true) {
            var buf = new Buffer(arr);
            var bufs = buf.toString(); //'utf-8'
            if (info)
                sys.log('sys.int2Array', info, 'buffer', bufs);
            return bufs;
            //*/            
        } else {
            var s = '';
            for (var i = 0; i < arr.length; i++) {
                var res = String.fromCharCode(arr[i]);
                if (info)
                    sys.log('sys.int2Array', info, val, i, arr[i]);
            }
            return s.toString("utf8");
        }
    };
    sys.Arr2Val = function(arr, idx, nb, log) {
        var val = 0;
        for (var i = 0; i < nb; i++) {
            val += arr[idx + i] * Math.pow(256, i);
            if (log) {
                sys.log('sys.Arr2Val', (idx + i), arr[idx + i], val, Math.pow(256, i));
            }
        }
        return val;
    };
    sys.Arr2Str = function(arr, idx, nb, log) {
        var s = '';
        for (var i = 0; i < nb; i++) {
            s += String.fromCharCode(arr[idx + i]);
            if (log) {
                sys.log('sys.Arr2Str', (idx + i), arr[idx + i], s);
            }
        }
        return s;
    };
    sys.ipInterne = function(ip) {
        var ips = [];
        ips.push('82.127.81.19');       //Ip ADSL Cogelec
        ips.push('193.252.185.3');   //Ip ADSL ITT
        ips.push('109.1.233.106');   //Ip ADSL SFR
        ips.push('176.31.232.76');   //IP s0
        ips.push('5.39.65.131');     //Ip s1
        ips.push('91.121.109.105');  //IP s2
        ips.push('188.165.201.130'); //IP web.hexact.fr
        ips.push('88.160.156.103');  //Ip JH
        for(var i=0; i<ips.length; i++){
            if (ips[i]==ip) return true;
        }
        return false;
        //if (substr($_SERVER['REMOTE_ADDR'], 0, 8) == '192.1.1.' or substr($_SERVER['REMOTE_ADDR'], 0, 8) == '192.168.' or $_SERVER['REMOTE_ADDR'] == '82.127.81.19' or $_SERVER['REMOTE_ADDR'] == '193.252.185.3' or $_SERVER['REMOTE_ADDR'] == '88.160.156.103' or $_SERVER['REMOTE_ADDR'] == '88.160.158.142' or $_SERVER['REMOTE_ADDR'] == '109.1.233.106') {
    };
    module.exports = sys;
}());