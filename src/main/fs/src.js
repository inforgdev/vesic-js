import fs from "fs";
import { optionsPath } from "./options.js";

export function file(path, options = "utf-8") {
    path = optionsPath(path);
    return () => fs.readFileSync(path, options);
};
