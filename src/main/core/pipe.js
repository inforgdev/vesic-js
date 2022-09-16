import { parallel, series, ret } from "../index.js";

function pipe() {
    return {
        src: (srcFunc, pipedValue, pipedMeta, pipedSinkVal) => {
            pipedValue = srcFunc();

            return {
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
            };
        },
    };
};

export { pipe };