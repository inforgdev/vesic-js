import { readFileSync } from "fs";
import { optionsPath } from "./_options.js";

export function cat(path, meta) {
    path = optionsPath(path || meta?.path);
    return readFileSync(path, meta?.options || "utf-8");
}