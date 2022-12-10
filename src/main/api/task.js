import globSync from "glob/sync.js";
import path from "path";
import config from "./defaultConfig.js";

let curTaskUrl;

export const tasks = {};

export const registerTask = (task) => tasks[task.id] = task;
export const unregisterTask = (taskId) => tasks[taskId] = undefined;
export const hasTask = (id) => tasks[id] !== undefined;
export const initApi = () => process.env['VESIC_API'] = true;

export function runTask(id, options, data) {
    options = {
        id,
        ...options,
    };

    const start = Date.now();
    tasks[id].main(options, data);
    const stop = Date.now();

    return {
        start,
        stop,
        dur: stop - start
    };
}

export function task(options) {
    const api = process.env['VESIC_API'] === "true";

    if(!api) {
        options.main();
        return;
    }

    process.emit("task", options);
}

function handleTask(payload) {
    const task = {
        id: path.basename(curTaskUrl || "", path.extname(curTaskUrl || "")),
        url: curTaskUrl,
        ...payload,
    };
    
    registerTask(task);
}

export function listenTask() {
    if(process.listenerCount("task") == 0) {
        process.on("task", handleTask);
    }
}

export async function loadTasks(glob = config.root) {
    listenTask();

    const files = await globSync(glob, {});

    for(let file of files) {
        curTaskUrl = file;
        await import(path.resolve(file));
    };
}