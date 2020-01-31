const express = require('express');
const fs = require('fs');
const app = express();

const ssh = require('./Q1');
const portcheck = require('./Q2');
const log = require('./Q3');
const cavailable = require('./Q4');
const iranAccess = require('./Q5');
const dnschk = require('./QBonus')
const { exec } = require('child_process');
// const subdomain = require('express-subdomain');
const dgram = require('dgram');
var serv = dgram.createSocket('udp4');

serv.on('message', (m, r) => {
    console.log(r);
    console.log(m);
})

serv.on('listening', () => {
    console.log('jfghsgbdsjk')
})

//deny all requests to port 22
// exec('iptables -A INPUT -p tcp --dport 22 -j DROP');

//Q1
app.get('/allowme', (req, res) => {
    ssh.addssh(req.ip)
    log.AddToLog(req.ip, req.get('user-agent'), 'AllowME')
    res.send("<h1 style=\"border: 5px solid red\">" + req.ip + " has been allowed to use SSH!</h1>");
});

//Q2
app.get('/checkme', (req,res) => {
    let str = '';
    portcheck.CheckMyPort(22, req.ip, (ans) => {
        
        str = str.concat('port 22: ' + ans + '<br>');
        console.log(str)
        if((str.match(/<br>/g) || []).length == 4){
            res.send(str);
        }
    });
    portcheck.CheckMyPort(25, req.ip, (ans) => {
        str = str.concat('port 25: ' + ans + '<br>');
        console.log(str)
        if((str.match(/<br>/g) || []).length == 4){
            res.send(str);
        }
    });
    portcheck.CheckMyPort(80, req.ip, (ans) => {
        str = str.concat('port 80: ' + ans + '<br>');
        console.log(str)
        if((str.match(/<br>/g) || []).length == 4){
            res.send(str);
        }
    });
    portcheck.CheckMyPort(443, req.ip, (ans) => {
        str = str.concat('port 443: ' + ans + '<br>');
        console.log(str)
        if((str.match(/<br>/g) || []).length == 4){
            res.send(str);
        }
    });    
    log.AddToLog(req.ip, req.get('user-agent'), 'CheckMe');
});

//Q3
app.get('/log', (req, res) => {
    fs.readFile('log.txt', (err, data) => {
        if(err){
            return console.log(err);
        }
        let s = data.toString();
        let sa = s.split('\n')
        var r = ''
        sa.forEach((el) => {
            r = r.concat(el + '</br>');
        })
        // console.log
        res.send(r);
    })
});

//Q4
app.get('/checkAvailability', (req, res) => {
    let url = req.query.addr;
    log.AddToLog(req.ip, req.get('user-agent'), 'CheckAvailablity');
    if(cavailable.CheckAvailable(url)){
        res.send(url + ' is available.');
    }else{
        res.send(url + ' is unavailable.');
    }
    log.AddToLog(req.ip, req.get('user-agent'), 'CheckAvailabllity');
});

//Q5
app.get('/IRANAccess', (req, res) => {
    iranAccess.IRANAccess();
    log.AddToLog(req.ip, req.get('user-agent'), 'IRANAccess');
    res.send('API is now only avilable to iranian users');
});

app.get('/FREEAccess', (req, res) => {
    iranAccess.FREEAccess();
    log.AddToLog(req.ip, req.get('user-agent'), 'FREEAccess')
    res.send('API is now available for everyone');
})

console.log('App is listening on port 3000...');

//Bonus
app.get('/mydns', (req, res) => {
    let subd = dnschk.rdomain();
    // console.log(subd.domain)
    if(subd !== null){
        res.send('<img src=\"' + subd.domain + '\">');
    }else{
        res.send('Try again later...')
    }
})

// app.use(subdomain(, ruter))

app.listen(3000);
serv.bind(53, 'localhost')
