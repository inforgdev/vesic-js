import { rmSync } from "fs";
import globSync from "glob/sync.js";
import { optionsPath } from "./_options.js";

export function clean(path, meta) {
    if(Array.isArray(path)) {
        path.forEach((p) => clean(p, meta));
        return;
    }

    path = optionsPath(path);

    const files = globSync(path);
    
    files.forEach((filepath) => {
        rmSync(filepath, { recursive: true, force: true, ...meta?.options });
    });

    return path;
}