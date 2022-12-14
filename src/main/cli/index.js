#!/usr/bin/env node

import chalk from "chalk";
import Yargs from "yargs";
import { initApi, loadTasks } from "../api/index.js";
import defaultCmd from "./commands/default/defaultCmd.js";
import listCmd from "./commands/list/listCmd.js";
import runCmd from "./commands/run/runCmd.js";

const yargs = Yargs(process.argv.splice(2));

initApi();
await loadTasks();
await loadTasks("./node_modules/a-vesic-test/dist/*.js");

yargs.scriptName("vesic");
yargs.usage(chalk.bold("$0 <cmd> [args]"));

yargs.help("help", chalk.gray("Show help"));
yargs.alias("help", "h");

yargs.describe("version", chalk.gray('Show version number'));
yargs.alias("version", "v");

yargs.command([ runCmd, listCmd, defaultCmd ]);

yargs.updateStrings({
    'Options:': chalk.blue('Options:'),
    'Commands:': chalk.blue('Commands:'),
});

yargs.parse();

export { yargs };