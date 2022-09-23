import fs from "fs";
import { optionsPath } from "./options.js";

export function readFile(path, meta) {
    path = optionsPath(path);
    return fs.readFileSync(path, meta.options || "utf-8");
};