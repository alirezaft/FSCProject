const express = require('express');
const app = express();

const ssh = require('./Q1');
const portcheck = require('./Q2');
const log = require('./Q3');
        
//deny all requests to port 22
exec('iptables -A INPUT -p tcp --dport 22 -j DROP');

//Q1
app.get('/allowme', (req, res) => {
    ssh.addssh(req.ip)
    // addToLog(req.ip, req.get('user-agent'), 'AllowMe');
    res.send("<h1 style=\"border: 5px solid red\">faghotd</h1>");
});

//Q2
app.get('/checkme', (req,res) => {
    let str = '';
    // addToLog(req.ip, req.get('user-agent'), 'CheckMe');
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
    portcheck.CheckMyPort(58876, req.ip, (ans) => {
        str = str.concat('port 443: ' + ans + '<br>');
        console.log(str)
        if((str.match(/<br>/g) || []).length == 4){
            res.send(str);
        }
    });    });

//Q3
app.get('/log', (req, res) => {
    res.send(req.get('user-agent'))
        fs.readFile('log.json', (err, data) => {
    })
})

console.log('App is listening on port 3000...');


app.listen(3000);