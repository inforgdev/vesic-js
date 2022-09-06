import { bypass, ret, val, vesic } from "../../dist/vesic.js";

test("core: should run vesic config", () => {
    const data = "1";

    const vesicConfig = {
        src: val(data),
        proc: bypass,
        sink: ret,
    };
    
    expect(vesic(vesicConfig))
        .toBe(data);
});

test("core: should run every vesic config", () => {
    const vesicConfig = {
        src: val("1"),
        proc: bypass,
        sink: ret,
    };
    const auto = vesic([ vesicConfig, vesicConfig ]);
    const manual = [ vesic(vesicConfig), vesic(vesicConfig) ];

    expect(auto.toString())
        .toBe(manual.toString());
});