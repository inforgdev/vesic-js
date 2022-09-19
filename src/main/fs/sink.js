import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { optionsPath } from "./options.js";

export function mkfile(data, meta) {
    let entry = optionsPath(meta.path);
    const targetDir = dirname(entry);

    mkdirSync(targetDir, { recursive: true, });
    writeFileSync(entry, data.toString(), meta.options);
};
