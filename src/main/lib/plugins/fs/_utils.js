import { appendFileSync, close, existsSync, mkdirSync, openSync, readFileSync, writeFileSync, writeSync } from "fs";
import { dirname } from "path";

export function formatWriteObj(obj) {
    let data = "";

    if(obj.p) data += obj.p;
    if(obj.w) data += obj.w;
    if(obj.a) data += obj.a;

    return data;
}

export function prependFile(path, data, appendData) {
    let content = readFileSync(path);

    if(appendData) {
        content += appendData.toString();
    }
    
    const fd = openSync(path, 'w+');
    const insert = Buffer.from(data);

    writeSync(fd, insert, 0, insert.length, 0)
    writeSync(fd, content, 0, content.length, insert.length)
    close(fd, (err) => {
        if(err) throw err;
    });
}

export function handleWrite(entry, data, meta) {
    let { p, w, a } = data;

    if(w) {
        data = formatWriteObj(data);
        writeFileSync(entry, data.toString(), meta?.options);
        return;
    }

    if(p === undefined && a === undefined) {
        return;
    }

    if(p === undefined && a) {
        appendFileSync(entry, a.toString(), meta?.options);
        return;
    }
    
    prependFile(entry, p, a);
}

export function mkdirIfNotExists(path) {
    const targetDir = dirname(path);

    if(!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
    }
}