import chalk from "chalk";
import handleId from "./handlers/handleId.js";
import handleWatch from "./handlers/handleWatch.js";
import handleRun from "./handlers/handleRun.js";
import idOption from "./options/idOption.js";
import watchOption from "./options/watchOption.js";
import delayOption from "./options/delayOption.js";
import limitOption from "./options/limitOption.js";

export default {
    command: [ "run <id>", "$0 [id]" ],
    describe: chalk.gray("Run task"),
    builder: {
        ...idOption,
        ...watchOption,
        ...limitOption,
        ...delayOption,
    },
    handler: function({ id, watch, limit, delay }) {
        const handle =
            () => handleId(id,
            () => handleWatch(id, watch, { delay, limit },
            () => handleRun(id)),
        );
        handle();
    },
};