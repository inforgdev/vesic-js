import chalk from "chalk";
import handleList from "./handlers/handleList.js";

export default {
    command: [ "list" ],
    describe: chalk.gray("List all tasks"),
    handler: function () {
        handleList();
    },
};