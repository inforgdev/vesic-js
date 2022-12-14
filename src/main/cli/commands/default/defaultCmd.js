import chalk from "chalk";
import handleDefaultCmd from "./handlers/handleDefaultCmd.js";

export default {
    command: [ "$0" ],
    describe: chalk.gray("Default command"),
    handler: function () {
        handleDefaultCmd();
    },
};