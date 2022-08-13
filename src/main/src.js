import fs from "fs";

export function dummySrc() { return () => undefined; }

export function file(path, options = "utf-8") {
    return () => fs.readFileSync(path, options);
}

export function val(src) {
    return () => src;
}