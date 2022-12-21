import { defineConfig } from "vite";
import { terser } from "rollup-plugin-terser";
import path from "path";

export default defineConfig({
    build: {
        lib: {
            entry: "./src/main/index.js",
            formats: [ "cjs", "es" ],
            name: "Vesic",
            fileName: "vesic",
        },
        outDir: "dist/",
        minify: 'esbuild',
        rollupOptions: {
            external: [ "fs", "path", "glob/sync.js" ],
            plugins: [ terser() ],
        },
    },
    test: {
        globals: true,
        alias: {
            "@": path.resolve("./"),
        },
    },
});