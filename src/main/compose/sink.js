export function parallel(...sinks) {
    return (data, meta) => sinks.map((sink) => sink(data, meta));
};