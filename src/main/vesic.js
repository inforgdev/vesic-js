import { dummySrc } from "./src.js";
import { dummyProc } from "./proc.js";
import { dummySink } from "./sink.js";

export function vesic(options) {
    options = optionsVesic(options);

    let srcData = options.src();
    let procFunc = options.proc(srcData, options.meta);
    let procData = procFunc(srcData, options.meta);

    return options.sink(procData, options.meta);
}

function optionsVesic(options = {}) {
    function handle(src = dummySrc, proc = dummyProc, sink = dummySink, meta = {}) {
        options.src = src;
        options.proc = proc;
        options.sink = sink;
        options.meta = meta;
    }

    handle(options.src, options.proc, options.sink, options.meta);
    return options;
}