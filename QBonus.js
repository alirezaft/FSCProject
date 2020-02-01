

const assignSubD = () => {
    res = null;
    domains.every((el, i) => {
        if(el.inUse === false){
            el.inUse = true;
            res = el;
            return false;
        }
        return true;
    })
    return res;
}

exports.rdomain = assignSubD;