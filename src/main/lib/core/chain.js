export function chain() {
    let deps = {};

    return {
        src(data) {
            deps.pipe = data;
            return this;
        },
        done: () => deps.sink,
        meta(obj) {
            deps.meta = obj;
            return this;
        },
        useProc(func) {
            deps.curProc = func;
            return this;
        },
        proc(plugin, inlineMeta) {
            if(inlineMeta) this.meta(inlineMeta);

            if(typeof plugin === "object") plugin = meta(deps.curProc, plugin);
            deps.pipe = plugin(deps.pipe, deps.meta || {});
            return this;
        },
        useSink(func) {
            deps.curSink = func;
            return this;
        },
        sink(plugin, inlineMeta) {
            if(inlineMeta) this.meta(inlineMeta);

            if(typeof plugin === "object") plugin = meta(deps.curSink, plugin);
            deps.sink = plugin(deps.pipe, deps.meta || {});
            return this;
        },
        series(...plugins) {
            plugins.forEach(func => this.proc(func));
            return this;
        },
        parallel(...plugins) {
            plugins.forEach(func => this.sink(func));
            return this;
        },
    };
};