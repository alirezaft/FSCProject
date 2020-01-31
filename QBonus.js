var domains = [
    {
        domain: 'a.try.ghoochishop.com',
        inUse: false
    },{
        domain: 'b.try.ghoochishop.com',
        inUse: false
    },{
        domain: 'c.try.ghoochishop.com',
        inUse: false
    },{
        domain: 'd.try.ghoochishop.com',
        inUse: false
    }
]

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