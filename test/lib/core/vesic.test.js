import { bypass, vesic } from "@/dist/vesic.js";

test("core: should run vesic config", () => {
    const data = "1";

    const vesicConfig = {
        src: data,
        proc: bypass,
        sink: bypass,
    };
    
    expect(vesic(vesicConfig))
        .toBe(data);
});

test("core: should run every vesic config", () => {
    const vesicConfig = {
        src: "1",
        proc: bypass,
        sink: bypass,
    };
    const auto = vesic([ vesicConfig, vesicConfig ]);
    const manual = [ vesic(vesicConfig), vesic(vesicConfig) ];

    expect(auto.toString())
        .toBe(manual.toString());
});