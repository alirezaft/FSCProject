// const net = require('net');
const socket = require('net');

const checkMyPort = (port, ip, callback) => {
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

    soc.setTimeout(1000);

    soc.on('timeout', () => {
        // console.log('timeout');
        callback('closed');
    });

    soc.connect(port, ip);
    return str;
}

exports.CheckMyPort = checkMyPort;