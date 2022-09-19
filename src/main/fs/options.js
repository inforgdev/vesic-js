import { format } from "path";

export function optionsPath(path) {
    return typeof path === "object" ? format(path) : path;
};