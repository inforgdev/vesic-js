import { optionsVesic } from "./options.js";

export function vesic(options) {
    if(Array.isArray(options)) return vesics(options);

    options = optionsVesic(options);

    let srcData = options.src();
    let procFunc = options.proc(srcData, options.meta);
    let procData = procFunc(srcData, options.meta);

    return options.sink(procData, options.meta);
}

function vesics(vesics) {
    let ret = [];

    vesics.forEach(curOptions => {
        ret.push(vesic(curOptions));
    });

    return ret;
}
