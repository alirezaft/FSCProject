const fs = require('fs');

fs.exists('./log.json', (res) => {
    if(!res){fs.appendFile('./log.json', JSON.stringify([]), (err) => {
        console.log(err);
    })}
})


addToLog = (ip, userAgent, req) => {
    var logj = '';
    fs.readFile('log.json', (err, data) => {
        if(err){
            return console.log('LOG FILE CANNOT BE OPENED!!!');
        }
        logj = JSON.parse(data);
    })
    console.log(logj);
    let log;
    if(logj != ''){
        let log = JSON.parse(logj);
    }else{
        log = [];
    }
    let dateobj = new Date();
    let day = dateobj.getDay();
    let month = dateobj.getMonth();
    let year = dateobj.getFullYear();
    let sec = dateobj.getSeconds();
    let min = dateobj.getMinutes();
    let hour = dateobj.getHours();

    let tstr = 'Date: ' + year + '/' + month + '/' + day + '/ Time: ' + hour + ':' + min + ':' + sec;
    console.log(tstr);
    log.push({
        IP : ip,
        Time : tstr,
        UserAgent : userAgent,
        Req: req
    });
    console.log(log);

    fs.writeFile('log.json' ,JSON.stringify(log), (err) => {
        if(err){
            console.log(err.code);
        }else{
            
        }
    })
}

exports.AddToLog = addToLog;
