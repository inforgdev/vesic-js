import fs, { rmSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { optionsPath } from "./options.js";
import globSync from "glob/sync.js";

export function readFile(path, meta) {
    path = optionsPath(path || meta?.path);
    return fs.readFileSync(path, meta?.options || "utf-8");
};

export function writeFile(data, meta) {
    let entry = optionsPath(meta?.path);
    const targetDir = dirname(entry);

    mkdirSync(targetDir, { recursive: true, });
    writeFileSync(entry, data.toString(), meta?.options);

    return data;
};

export function clean(path, meta) {
    if(Array.isArray(path)) {
        path.forEach((p) => clean(p));
        return;
    }

    path = optionsPath(path);

    const files = globSync(path);
    
    files.forEach((filepath) => {
        rmSync(filepath, { recursive: true, force: true, ...meta?.options });
    });

    return path;
}