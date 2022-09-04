export function series(...tasks) {
    return (data, meta) => tasks.reduce(
        (prev, curr) => curr(prev, meta),
        data,
    );
};