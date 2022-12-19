import k, { readFileSync as d, mkdirSync as y, writeFileSync as v, rmSync as S } from "fs";
import c, { format as b, dirname as w } from "path";
import m from "glob/sync.js";
function T() {
  return () => {
  };
}
function g(e) {
  return e;
}
function A() {
}
function E(e) {
  if (Array.isArray(e))
    return function(t) {
      return t.map((n) => E(n));
    }(e);
  let s = (e = function(t = {}) {
    return function(n = T, a = g, f = A, p = {}) {
      t.src = n, t.proc = a, t.sink = f, t.meta = p;
    }(t.src, t.proc, t.sink, t.meta), t;
  }(e)).src, r = e.proc(s, e.meta);
  return e.sink(r, e.meta);
}
function z() {
  let e = { pipe: void 0, meta: void 0, sink: void 0, curProc: void 0, curSink: void 0 };
  return { src(s) {
    return e.pipe = s, this;
  }, done: () => e.sink, meta(s) {
    return e.meta = s, this;
  }, useProc(s) {
    return e.curProc = s, this;
  }, proc(s, r) {
    return r && this.meta(r), typeof s == "object" && (s = meta(e.curProc, s)), e.pipe = s(e.pipe, e.meta || {}), this;
  }, useSink(s) {
    return e.curSink = s, this;
  }, sink(s, r) {
    return r && this.meta(r), typeof s == "object" && (s = meta(e.curSink, s)), e.sink = s(e.pipe, e.meta || {}), this;
  }, series(...s) {
    return s.forEach((r) => this.proc(r)), this;
  }, parallel(...s) {
    return s.forEach((r) => this.sink(r)), this;
  } };
}
function B(e, s) {
  return (r) => e(r, s);
}
function G(...e) {
  return (s, r) => e.map((t) => t(s, r));
}
function H(...e) {
  return (s, r) => e.reduce((t, n) => n(t, r), s);
}
function R(e) {
  console.log(e);
}
function l(e) {
  return typeof e == "object" ? b(e) : e;
}
function J(e, s) {
  return e = l(e || (s == null ? void 0 : s.path)), d(e, (s == null ? void 0 : s.options) || "utf-8");
}
function K(e, s) {
  let r = l(s == null ? void 0 : s.path);
  const t = w(r);
  return y(t, { recursive: !0 }), v(r, e.toString(), s == null ? void 0 : s.options), e;
}
function P(e, s) {
  return Array.isArray(e) ? void e.forEach((r) => P(r)) : (e = l(e), m(e).forEach((r) => {
    S(r, { recursive: !0, force: !0, ...s == null ? void 0 : s.options });
  }), e);
}
const j = "./src/task/*.js", h = { glob: "./src/**/*.js", delay: 100 };
let o;
const i = {}, F = (e) => i[e.id] = e, L = (e) => i[e] = void 0, I = (e) => i[e] !== void 0, M = () => process.env.VESIC_API = !0;
function N(e) {
  return !(!I(e) || !i[e].main) && typeof i[e].main == "function";
}
function C(e, s, r) {
  s = { id: e, ...s };
  const t = Date.now();
  i[e].main(s, r);
  const n = Date.now();
  return { start: t, stop: n, dur: n - t };
}
function O(e) {
  process.env.VESIC_API === "true" ? process.emit("task", e) : e.main();
}
function x(e) {
  const s = { id: c.basename(o || "", c.extname(o || "")), url: o, ...e };
  F(s);
}
function D() {
  process.listenerCount("task") == 0 && process.on("task", x);
}
async function Q(e = j) {
  D();
  const s = await m(e, {});
  for (let r of s)
    o = r, await import(c.resolve(r));
}
let u;
const U = () => u.length > 0;
function V(e = h.glob) {
  return u = m(e), e;
}
function X(e, s) {
  s = { ...h, ...s }, !u && V(s.glob);
  const r = { id: e, ...s };
  u.forEach((t, n) => {
    let a = !1;
    k.watch(c.resolve(t), (f, p) => {
      a || (a = !0, C(e, r, { watch: { event: f, filename: p, file: t } }), setTimeout(() => {
        a = !1;
      }, s.delay));
    });
  });
}
export {
  g as bypass,
  z as chain,
  P as clean,
  A as dummySink,
  T as dummySrc,
  I as hasTask,
  U as hasWatchables,
  M as initApi,
  V as initWatch,
  N as isTaskRunnable,
  D as listenTask,
  Q as loadTasks,
  B as meta,
  G as parallel,
  R as print,
  J as readFile,
  F as registerTask,
  C as runTask,
  H as series,
  O as task,
  i as tasks,
  L as unregisterTask,
  E as vesic,
  X as watchTask,
  K as writeFile
};
