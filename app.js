const express = require('express');
const fs = require('fs');
const app = express();

const ssh = require('./Q1');
const portcheck = require('./Q2');
const log = require('./Q3');
const cavailable = require('./Q4');
const iranAccess = require('./Q5');
// const dnschk = require('./QBonus')
const { exec } = require('child_process');
// const subdomain = require('express-subdomain');
const dgram = require('dgram');
var serv = dgram.createSocket('udp4');
const rstring = require('randomstring');
const dpack = require('dns-packet');

var addrs = [];

serv.on('message', (m, r) => {
    // console.log(r);
    // console.log(m);
    let d = dpack.decode(m);
    console.log(d.questions[0].name)
    console.log('address: ' + r.address);
    addrs.push(r.address)
    console.log(addrs[0])

    // serv.send()
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
    let s = cavailable.CheckAvailable(url, (s) => {
        res.send(url + ' ' + s);
    });
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
    // let subd = dnschk.rdomain();
    // console.log(subd.domain)
    var subd = rstring.generate(5) + '.uploadify.ir';
    if(subd !== null){
        res.send('<!DOCTYPE html><html lang="en-US"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><script>function a(){var x = new XMLHttpRequest();x.open(\'GET\', \'http://94.156.144.159:3000/showdns\');x.send();console.log(\'DOOOONE!\');console.log(x.responseText);document.write(x.responseText)}</script></head></html><body><img onerror=\"a()\" src=\"https://' + subd + '\"><p id=\"pa\"></p></body>');
    }else{
        res.send('Try again later...')
    }
})

app.get('/showdns', (req, res) => {
    console.log('I HAVE DNS!');
    console.log('****' + addrs[addrs.length - 1 ] + '***');
    res.send(addrs[addrs.length - 1])

})

// app.use(subdomain(, ruter))

app.listen(3000);
serv.bind(53);
