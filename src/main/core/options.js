import { dummyProc, dummySink, dummySrc } from "../dummy/index.js";

export function optionsVesic(options = {}) {
    function handle(src = dummySrc, proc = dummyProc, sink = dummySink, meta = {}) {
        options.src = src;
        options.proc = proc;
        options.sink = sink;
        options.meta = meta;
    }

    handle(options.src, options.proc, options.sink, options.meta);
    return options;
}