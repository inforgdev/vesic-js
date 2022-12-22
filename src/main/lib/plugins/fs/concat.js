import { readFileSync, existsSync } from "fs";

export function concat(path, meta) {
    const headerFunc = meta.header || "\n";
    const footerFunc = meta.footer || "";

    let files = [];

    if(Array.isArray(path)) {
        files = path;
    } else {
        files.push(path);
    }

    if(path === undefined || files.length === 0) {
        return;
    }

    let content = "";

    function option(data, file, i) {
        if(typeof data === "function") {
            return data(file, i, files.length);
        }

        return data;
    }

    files.forEach((file, i) => {
        const data = existsSync(file) ? readFileSync(file) : "";
        const header = option(headerFunc, file, i);
        const footer = option(footerFunc, file, i);
        content += header + data + footer;
    });

    return content;
}