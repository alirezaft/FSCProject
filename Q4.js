const request = require('request');

checkAvailable = (url) => {
    request.get(url, (err, res, body) => {
        if(err){
            console.log(err);
            return false;
        }
        if(res.statusCode == 200 || res.statusCode == 202 || res.statusCode == 204){
            console.log('Access granted');
            return true;
        }
    })
}

exports.CheckAvailable = checkAvailable;