import chalk from "chalk";
import { tasks } from "../../../../api/index.js";

export default function () {
    const taskKeys = Object.keys(tasks);

    if(taskKeys.length === 0) {
        console.log(chalk.yellow(`No task found.`));
        return;
    }

    const taskNames = taskKeys.reduce(
        (p, c) => {
            const task = tasks[c];
            const taskId = chalk.white(task.id);
            const desc = task.desc ? "    " + chalk.white(task.desc) : '';
            const url = task.url ? chalk.gray(task.url) + " " : '';
            const line = url + taskId + desc;
            
            return [...p, line];
        },
        [],
    );

    console.log(chalk.green("Tasks: \n") + taskNames.join("\n"));
    console.log("\n" + chalk.gray(`(${taskKeys.length} tasks)`));
};