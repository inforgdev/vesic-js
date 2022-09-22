import { parallel, series } from "../compose/index.js";

function stream(pipedValue, pipedMeta, pipedSinkVal) {
    let useProc, useSink;

    return {
        src(srcFunc) {
            pipedValue = srcFunc();
            return this;
        },
        done: () => pipedSinkVal,
        meta(metaObj) {
            pipedMeta = metaObj;
            return this;
        },
        useProc(func) {
            useProc = func;
            return this;
        },
        proc(value) {
            if(typeof value === "object") value = meta(useProc, value);
            pipedValue = value(pipedValue, pipedMeta || {});
            return this;
        },
        useSink(func) {
            useSink = func;
            return this;
        },
        sink(value) {
            if(typeof value === "object") value = meta(useSink, value);
            pipedSinkVal = value(pipedValue, pipedMeta || {});
            return this;
        },
        series(...procFuncs) {
            return this.proc(series(...procFuncs));
        },
        parallel(...sinkFuncs) {
            return this.sink(parallel(...sinkFuncs));
        },
        exec(func, meta) {
            this.meta(meta)
            return this.proc(func)
        },
    };
};

export { stream };