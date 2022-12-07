import { print } from "../../dist/vesic.js";

test("std: should run `console.log`", () => {
    const data = "1";

    const consoleLog = vi.spyOn(console, "log");

    print(data);

    expect(consoleLog)
        .toHaveBeenCalledWith(data);
});
