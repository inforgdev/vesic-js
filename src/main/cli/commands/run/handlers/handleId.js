import chalk from "chalk";
import { hasTask, isTaskRunnable } from "../../../../api/index.js";

export default function (id, cb) {
    if(!hasTask(id)) {
        console.log(chalk.yellow(`Task ${chalk.white(id)} not found.`));
        return;
    }

    if(!isTaskRunnable(id)) {
        console.log(chalk.yellow(`Task ${chalk.white(id)} is not runnable. Don't forget to pass the main function in the task options.`));
        return;
    }

    cb();
}