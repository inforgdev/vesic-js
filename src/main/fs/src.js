import fs from "fs";

export function file(path, options = "utf-8") {
    return () => fs.readFileSync(path, options);
}
