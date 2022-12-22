import { readFileSync, existsSync } from "fs";
import { optionsPath } from "./_options.js";

export function cat(path, meta) {
    path = optionsPath(path || meta?.path);

    if(!existsSync(path)) {
        return undefined;
    }

    return readFileSync(path, meta?.options || "utf-8");
}