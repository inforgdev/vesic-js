import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { afterAll, beforeAll } from "vitest";
import { mkfile, file } from "../../dist/vesic.js";

const mock = {
    data: "1",
    path: {
        fulldir: "test/test",
        dirname: "test",
        filename: "test/a.txt",
    },
};

const path = join(mock.path.dirname, mock.path.filename);

const rm = () => rmSync(mock.path.dirname, { recursive: true, force: true });
const mk = () => {
    mkdirSync(mock.path.fulldir, { recursive: true, force: true });
    writeFileSync(path, mock.data, { recursive: true, force: true });
}

beforeAll(() => rm());
afterAll(() => rm());

test("fs: `file()` should return a function that reads a file recursively from the meta path property and returns its content", () => {
    mk();

    const src = file(path);
    const auto = src(); 
    const manual = readFileSync(path, "utf-8");

    expect(auto)
        .toBe(manual);
});

test("fs: `mkfile()` should make a file recursively with data argument as its content", () => {
    mkfile(mock.data, { path });
    const fileData = readFileSync(path, "utf-8");

    expect(fileData)
        .toBe(mock.data);
});
