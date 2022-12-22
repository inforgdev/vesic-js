import { renameSync } from "fs";
import { format, parse } from "path";
import { mkdirIfNotExists } from "./_utils.js";

export function mv(path, meta) {
    if(Array.isArray(path)) {
        path.forEach((p) => mv(p, meta));
        return;
    }
    
    let pathObj = parse(path);
    
    let newPath = meta.path;

    if(typeof newPath === "object") {
        const { root, dir, base, ext, name } = meta.path;

        if(ext !== undefined || name !== undefined) {
            pathObj.base = undefined;
        }

        root !== undefined && (pathObj.root = root);
        dir !== undefined && (pathObj.dir = dir);
        base !== undefined && (pathObj.base = base);
        ext !== undefined && (pathObj.ext = ext);
        name !== undefined && (pathObj.name = name);
        
        newPath = format(pathObj);
    }

    mkdirIfNotExists(newPath);

    renameSync(path, newPath);
    return newPath;
}