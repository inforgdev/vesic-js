import fs from "fs";
import path from "path";
import globSync from "glob/sync.js";
import { runTask } from "./task.js";
import config from "./defaultConfig.js";

let files;

export const hasWatchables = () => files.length > 0;

export function initWatch(glob = config.watch.glob) {
    files = globSync(glob);

    return glob;
}

export function watchTask(taskId, options) {
    options = { ...config.watch, ...options };

    !files && initWatch(options.glob);

    const fullOptions = {
        id: taskId,
        ...options,
    };

    files.forEach((file, i) => {
        let watching = false;

        const handleWatch = (event, filename) => {
            if(watching) return;
            watching = true;

            const data = {
                watch: { event, filename, file },
            };

            runTask(taskId, fullOptions, data);

            setTimeout(() => {
                watching = false;
            }, options.delay);
        };
        
        fs.watch(path.resolve(file), handleWatch);
    });
}