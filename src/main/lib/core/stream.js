import { meta } from "./utils.js";

export function stream(pipedValue, pipedMeta, pipedSinkVal) {
    let useProc, useSink;

    return {
        src(data) {
            pipedValue = data;
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
        proc(value, inlineMeta) {
            if(inlineMeta) this.meta(inlineMeta);

            if(typeof value === "object") value = meta(useProc, value);
            pipedValue = value(pipedValue, pipedMeta || {});
            return this;
        },
        useSink(func) {
            useSink = func;
            return this;
        },
        sink(value, inlineMeta) {
            if(inlineMeta) this.meta(inlineMeta);

            if(typeof value === "object") value = meta(useSink, value);
            pipedSinkVal = value(pipedValue, pipedMeta || {});
            return this;
        },
        series(...procValues) {
            procValues.forEach(func => this.proc(func));
            return this;
        },
        parallel(...sinkValues) {
            sinkValues.forEach(func => this.sink(func));
            return this;
        },
    };
};