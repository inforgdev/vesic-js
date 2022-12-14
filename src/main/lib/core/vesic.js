import { optionsVesic } from "./options.js";

export function vesic(options) {
    if(Array.isArray(options)) return vesics(options);

    options = optionsVesic(options);

    let srcData = options.src;
    let procData = options.proc(srcData, options.meta);

    return options.sink(procData, options.meta);
};

function vesics(vesics) {
    return vesics.map((curr) => vesic(curr));
}
