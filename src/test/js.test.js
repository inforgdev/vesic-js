import { val, ret } from "../../dist/vesic.js";

test("js: `val()` should return a function that returns its argument", () => {
    const data = "1";
    const src = val(data);
    const srcData = src();

    expect(srcData)
        .toBe(data);
});

test("js: `ret()` should return the function argument", () => {
    const data = "1";
    const sinkData = ret(data);

    expect(sinkData)
        .toBe(data);
});