import { join } from "path";

export function optionsPath(path) {
    if(typeof path === 'object') {
        path = optionsMetaPathObj(meta.path);
        return join(path.dirname, path.name + path.extname);
    }

    return path;
};

export function optionsMetaPathObj(path) {
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
};

export function optionsMkfile(meta = {}) {
    function handle(path = "./dest/index.txt") {
        meta.path = path;
    }

    handle(meta.path);
    return meta;
};