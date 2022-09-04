import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { optionsMkfile, optionsPath } from "./options.js";

export function mkfile(data, meta) {
    meta = optionsMkfile(meta);

    let path = optionsPath(meta.path);
    const targetDir = dirname(path);

    mkdirSync(targetDir, { recursive: true, });
    writeFileSync(path, data, meta.options);
};
