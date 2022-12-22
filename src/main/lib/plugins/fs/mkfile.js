import { optionsPath } from "./_options.js";
import { handleWrite } from "./_utils.js";

export function mkfile(data, meta) {
    let entry = optionsPath(meta?.path);
    let mkdir = data !== undefined;
    let handleObject;

    if(typeof data === "object") {
        const { a, w, p } = data;

        if(!a && !w && !p) {
            mkdir = false;
            return data;
        }

        handleObject = () => handleWrite(entry, { a, w, p }, meta);
    }

    if(mkdir) {
        mkdirIfNotExists(entry);
    }

    if(handleObject) {
        handleObject();
    } else {
        handleWrite(entry, { w: data }, meta);
    }

    return data;
}