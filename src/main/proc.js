export function dummyProc() {
    return (data) => data;
}

export function series(...tasks) {
    return (data, meta) => () => {
        let lastData = data;

        tasks.forEach(task => {
            let procFunc = task(lastData, meta);
            lastData = procFunc(lastData, meta);
        });

        return lastData;
    }
}