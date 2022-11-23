import fs from "fs";
import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { optionsPath } from "./options.js";

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