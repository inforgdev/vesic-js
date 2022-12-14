import chalk from "chalk";

export default {
    id: {
        type: 'string',
        demandOption: true,
        describe: chalk.gray("The id of the task to execute"),
    },
};