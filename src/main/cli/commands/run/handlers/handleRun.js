import chalk from "chalk";
import moment from "moment/moment.js";
import { runTask } from "../../../../api/index.js";

export default function (id, cb) {
    console.log(chalk.gray(`Running task ${chalk.white(id)}...`));

    const { dur } = runTask(id);
    const now = chalk.gray(`[${moment().format('h:mm:ss a')}]`);
    
    console.log(`${now} ${id} - ${dur}ms`);
};