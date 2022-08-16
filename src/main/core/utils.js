export function meta(func, meta) {
    return (options) => func(options, meta);
}