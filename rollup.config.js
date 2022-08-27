import fs from "fs";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const pkg = JSON.parse(fs.readFileSync("package.json"));

export default {
    input: "./src/main/index.js",
    output: {
        file: pkg.main,
    },
    external: [
        "fs",
        "path",
    ],
    plugins: [
        nodeResolve(),
        terser(),
    ],
};