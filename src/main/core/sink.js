import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

export function dummySink() {}

export function mkfile(data, meta) {
    meta = optionsMkfile(meta);

    let path = optionsPath(meta.path);
    const targetDir = dirname(path);

    mkdirSync(targetDir, { recursive: true, });
    writeFileSync(path, data, meta.options);
}

function optionsPath(path) {
    if(typeof path === 'object') {
        path = optionsMetaPathObj(meta.path);
        return join(path.dirname, path.name + path.extname);
    }

    return path;
}

function optionsMetaPathObj(path) {
    function handle(
        dirname = "./dest/",
        name = "index",
        extname = ".txt",
    ) {
        path.dirname = dirname;
        path.name = name;
        path.extname = extname;
    };

    handle(path.dirname, path.name, path.extname);
    return path;
}

function optionsMkfile(meta = {}) {
    function handle(path = "./dest/index.txt") {
        meta.path = path;
    }

    handle(meta.path);
    return meta;
}

export function ret(data) { return data; }

export function print(data) {
    console.log(data);
}

export function parallel(...func) {
    return (data, meta) => {
        let ret = [];
    
        func.forEach(curSink => {
            ret.push(curSink(data, meta));
        });
    
        return ret;
    };
}