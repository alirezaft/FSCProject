const request = require('request');
const dns = require('dns');
// const range = require('ip-range-check');

checkAvailable = (url, callback) => {
    dns.lookup(url, (err, addr, fam) => {
        if(err){
            console.log(err);
            callback('not found')
        }else{
            if(addr.startsWith('10.10.')){
                callback('isFiltered')
            }else{
                if(!url.startsWith('http')){
                    let h = 'https://';
                    h = h.concat(url);
                    url = h;
                    console.log('h: ' + h)
                }
                request.get(url, (err, res, body) => {
                    if(err){
                        console.log('error connecting to site');
                        callback('Cannot connect');
                    }
                    
                    if(res.statusCode == 200 || res.statusCode == 202 || res.statusCode == 204){
                        console.log('Access granted');
                        
                        callback('is available');
                    }
                    
                })
            }
        }
        return 'WTF!!!'
    
    })}

exports.CheckAvailable = checkAvailable;