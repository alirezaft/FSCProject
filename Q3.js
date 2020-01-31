const fs = require('fs');


addToLog = (ip, userAgent, req) => {
    console.log(req);
    let dateobj = new Date(Date.now());
    let day = dateobj.getDay();
    let month = dateobj.getMonth();
    let year = dateobj.getFullYear();
    let sec = dateobj.getSeconds();
    let min = dateobj.getMinutes();
    let hour = dateobj.getHours();

    let tstr = dateobj.toLocaleString({
        timeZone: 'Asia/Tehran',
        hourCycle: '24h'
    });
    ip = ip.split(':')[3];
    console.log(ip)
    fs.appendFile('log.txt', 'Date: ' + tstr + ', IP: ' + ip + ', Request: ' + req + ', User-Agent: ' + userAgent + '\n', (err) => {
        if(err){
            console.log('AN ERROR OCCURED!!!');
            return console.log(err);
        }
    }); 
}

showLog = () => {
    let str;
    fs.readFile('log.txt', (err, data) => {
        if(err){
            console.log('AN ERROR OCCURED READING FILE!!!');
            return console.log(err);
        }
        str = data;
    })
    return str;
}

exports.AddToLog = addToLog;
exports.ShowLog = showLog;