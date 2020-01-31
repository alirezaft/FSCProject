const {exec} = require('child_process');

const iranAccess = () => {
    exec('./iranaccesss.sh', (err, stdout, stderr) => {
        if(err){
            return console.log(err);
        }
        console.log(stdout);
    });
}

const freeAccess = () => {
    exec('./freeaccess.sh', (err, stdout, stderr) => {
        if(err){
            return console.log(err)
        }
        console.log(stdout);
    });
}

exports.IRANAccess = iranAccess;
exports.FREEAccess = freeAccess;