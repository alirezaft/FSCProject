const { exec } = require('child_process');

const addIP4SSH = (ip) => {
    console.log(ip);
    // exec('sudo iptables -A INPUT -p tcp -m tcp --dport 22 -s ' + ip + ' -j ACCEPT');
    // exec('sudo iptables -A INPUT -p tcp -m tcp --dport 22 -s -j DROP');
    exec('iptables -D INPUT -p tcp --dport 22 -j DROP');
    exec('iptables -A INPUT -s ' + ip + ' -j ACCEPT');
    exec('iptables -A INPUT -p tcp --dport 22 -j DROP');
}

exports.addssh = addIP4SSH;