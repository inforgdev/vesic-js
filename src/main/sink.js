import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

export function dummySink() {}

export function mkfile(data, meta) {
    meta = optionsMkfile(meta);

    let fileDist = meta.path;
    
    if(typeof meta.path === 'object') {
        meta = optionMetaPathObj(meta);
        fileDist = join(meta.path.dirname, meta.path.name + meta.path.extname);
    }

    const targetDir = dirname(fileDist);

    mkdirSync(targetDir, { recursive: true, });
    writeFileSync(fileDist, data, meta.options);
}

function optionMetaPathObj(meta) {
    function handle(
        dirname = "./dest/",
        name = "index",
        extname = "txt",
    ) {
        meta.path.dirname = dirname;
        meta.path.name = name;
        meta.path.extname = extname;
    };

    handle(meta.path.dirname, meta.path.name, meta.path.extname);
    return meta;
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