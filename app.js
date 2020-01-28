const express = require('express');
const app = express();
const net = require('net');
const { exec } = require('child_process');
const socket = require('net');

//Q1
app.get('/allowme', (req, res) => {
    console.log(req.ip);
    exec('sudo iptables -A INPUT -p tcp -m tcp --dport 22 -s ' + req.ip + ' -j ACCEPT');
    exec('sudo iptables -A INPUT -p tcp -m tcp --dport 22 -s -j DROP');
    res.send("<h1 style=\"border: 5px solid red\">faghotd</h1>");
});

app.get('/checkme', (req,res) => {
    let str = '';

    checkMyPort(22, req.ip, (ans) => {
        str = str.concat('port 22: ' + ans + '<br>');
        console.log(str)
        if((str.match(/<br>/g) || []).length == 4){
            res.send(str);
        }
    });
    checkMyPort(25, req.ip, (ans) => {
        str = str.concat('port 25: ' + ans + '<br>');
        console.log(str)
        if((str.match(/<br>/g) || []).length == 4){
            res.send(str);
        }
    });
    checkMyPort(80, req.ip, (ans) => {
        str = str.concat('port 80: ' + ans + '<br>');
        console.log(str)
        if((str.match(/<br>/g) || []).length == 4){
            res.send(str);
        }
    });
    checkMyPort(443, req.ip, (ans) => {
        str = str.concat('port 443: ' + ans + '<br>');
        console.log(str)
        if((str.match(/<br>/g) || []).length == 4){
            res.send(str);
        }
    });    
})
console.log('App is listening on port 3000...');

function checkMyPort(port, ip, callback){
    console.log('Checking...');
    let soc = new socket.Socket();
    var str = '';
    soc.on('connect', () => {
        // console.log(port + ' open ');
        callback('open');
    });

    soc.on('error', (err) => {
        // console.log(err);
        callback('closed');
    });

    soc.on('timeout', () => {
        // console.log('timeout');
        callback('closed');
    });

    soc.connect(port, ip);
    return str;
}

app.listen(3000);