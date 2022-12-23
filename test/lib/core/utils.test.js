import { parallel, series } from "@/dist/vesic.js";

test("utils: `parallel()` should run every sink with the same input", () => {
    const sink = (input, meta) => input + meta; 
    const run = (sink) => sink("1", {});

    const auto = run(parallel(sink, sink));
    const manual = [ run(sink), run(sink) ];

    expect(auto.toString())
        .toBe(manual.toString());
});

test("utils: `series()` should run cascading processes and return the last output", () => {
    const sum = (input, meta) => input + meta.a; 

    const proc = series(sum, sum, sum);
    const procData = proc(0, { a: 1 });

    expect(procData)
        .toBe(3);
});
