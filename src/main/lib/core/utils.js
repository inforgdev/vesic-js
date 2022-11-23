export function meta(plugin, meta) {
    return (data) => plugin(data, meta);
};

export function parallel(...plugins) {
    return (data, meta) => plugins.map((plugin) => plugin(data, meta));
};

export function series(...plugins) {
    return (data, meta) => plugins.reduce(
        (prev, cur) => cur(prev, meta),
        data,
    );
};