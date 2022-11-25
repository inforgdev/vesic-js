import appConfig from "../src/docs/appConfig.js";
import themeConfig from "../src/docs/themeConfig.js";

export default {
    base: '/vesic-js/',
    srcDir: './src/docs',
    outDir: './dist/docs',
    ...appConfig,
    themeConfig,
};