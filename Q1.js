const { exec } = require('child_process');

const addIP4SSH = (ip) => {
    console.log(ip);
    // exec('sudo iptables -A INPUT -p tcp -m tcp --dport 22 -s ' + ip + ' -j ACCEPT');
    // exec('sudo iptables -A INPUT -p tcp -m tcp --dport 22 -s -j DROP');
    exec('iptables -D INPUT -p tcp --dport 22 -j DROP', (err, stdout, stderr) => {
        setTimeout(() => {
            exec('iptables -A INPUT -s ' + ip + ' -j ACCEPT')
            setTimeout(() => {
                exec('iptables -A INPUT -p tcp --dport 22 -j DROP');         
            }, 5)
        }, 5)
    });
    exec('iptables -A INPUT -s ' + ip + ' -j ACCEPT', (err, stdout, stderr) => {
    });
    exec('iptables -A INPUT -p tcp --dport 22 -j DROP', (err, stdout, stderr) => {
        
    });
}

exports.addssh = addIP4SSH;