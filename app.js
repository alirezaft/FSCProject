const express = require('express');
const app = express();
const ps = require('portscanner');

app.get('/allowme', (req, res) => {
    console.log(req.ip);
    res.send("<h1 style=\"border: 5px solid red\">faghotd</h1>");
});

app.get('/checkme', (req,res) => {
    console.log('Client\'s IP\'s' + req.ip);
    ps.checkPortStatus(25, req.ip, (err, status) => {
        res.send('port 25:' + status);    
    });
    ps.checkPortStatus(23, req.ip, (err, status) => {
        res.send('port 25: ' + status);
    })
})
console.log('App is listening on port 3000...');
app.listen(3000);
