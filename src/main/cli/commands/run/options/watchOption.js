import chalk from "chalk";

export default {
    watch: {
        type: "string",
        alias: "w",
        describe: chalk.gray("The glob pattern to watch"),
    },
};