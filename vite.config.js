import { defineConfig } from "vite";
import { terser } from "rollup-plugin-terser";

export default defineConfig({
    build: {
        lib: {
            entry: "./src/main/lib/index.js",
            formats: [ "cjs", "es" ],
            name: "Vesic",
            fileName: "vesic",
        },
        outDir: "dist/",
        minify: 'esbuild',
        rollupOptions: {
            external: [ "fs", "path" ],
            plugins: [ terser() ],
        },
    },
});