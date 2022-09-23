import fs from "fs";
import babel from "@rollup/plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const pkg = JSON.parse(fs.readFileSync("package.json"));

export default {
    input: "./src/main/index.js",
    output: [
        {
            file: pkg.module,
            format: "esm",
            plugins: [ terser() ],
        },
        {
            file: pkg.main,
            format: "cjs",
            plugins: [ terser() ],
        },
    ],
    external: [
        "fs",
        "path",
    ],
    plugins: [
        nodeResolve(),
        babel({
            babelHelpers: "bundled",
            include: [ "src/**/*.js" ],
            extensions: [ ".js", ".ts" ],
            exclude: "./node_modules/**"
        }),
    ],
};