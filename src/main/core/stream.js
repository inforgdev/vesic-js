import { parallel, series } from "../compose/index.js";

function stream(pipedValue, pipedMeta, pipedSinkVal) {
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
        proc(procFunc) {
            pipedValue = procFunc(pipedValue, pipedMeta || {});
            return this;
        },
        sink(sinkFunc) {
            pipedSinkVal = sinkFunc(pipedValue, pipedMeta || {});
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