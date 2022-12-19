import { existsSync, mkdirSync, readFileSync, rmSync } from "fs";
import globSync from "glob/sync.js";
import { dirname } from "path";
import { optionsPath } from "./options.js";
import { handleWrite } from "./utils.js";

export function cat(path, meta) {
    path = optionsPath(path || meta?.path);
    return readFileSync(path, meta?.options || "utf-8");
}

export function mkfile(data, meta) {
    let entry = optionsPath(meta?.path);
    const targetDir = dirname(entry);
    let mkdir = data !== undefined;
    let handleObject;

    if(typeof data === "object") {
        const { a, w, p } = data;

        if(!a && !w && !p) {
            mkdir = false;
            return data;
        }

        handleObject = () => handleWrite(entry, { a, w, p }, meta);
    }

    if(!existsSync(entry) && mkdir) {
        mkdirSync(targetDir, { recursive: true });
    }

    if(handleObject) {
        handleObject();
    } else {
        handleWrite(entry, { w: data }, meta);
    }

    return data;
}

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