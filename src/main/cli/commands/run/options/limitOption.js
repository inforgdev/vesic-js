import chalk from "chalk";

export default {
    limit: {
        type: "number",
        alias: "l",
        describe: chalk.gray("Execute task x times on watch"),
    },
};