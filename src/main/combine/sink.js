export function parallel(...func) {
    return (data, meta) => {
        let ret = [];
    
        func.forEach(curSink => {
            ret.push(curSink(data, meta));
        });
    
        return ret;
    };
}