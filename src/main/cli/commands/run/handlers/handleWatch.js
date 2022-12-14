import chalk from "chalk";
import { hasWatchables, initWatch, watchTask } from "../../../../api/index.js";

export default function (id, glob, options, cb) {
    if(glob !== undefined) {
        glob = glob === "" ? undefined : glob;

        glob = initWatch(glob);

        if(!hasWatchables()) {
            console.log(chalk.yellow(`No file found for the glob ${chalk.white(glob)}.`));
            return;
        }

        console.log(chalk.gray(`Watching ${chalk.white(glob)} for task ${chalk.white(id)}...`));
        
        watchTask(id, {
            glob,
            ...options,
        });
        return;
    }

    cb();
};