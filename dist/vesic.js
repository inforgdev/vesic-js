import w, { readFileSync as y, openSync as v, writeSync as k, close as g, writeFileSync as b, appendFileSync as T, existsSync as j, mkdirSync as A, rmSync as E } from "fs";
import l from "glob/sync.js";
import f, { format as P, dirname as F } from "path";
function I() {
  return () => {
  };
}
function x(e) {
  return e;
}
function C() {
}
function W(e) {
  if (Array.isArray(e))
    return function(t) {
      return t.map((i) => W(i));
    }(e);
  let s = (e = function(t = {}) {
    return function(i = I, a = x, r = C, o = {}) {
      t.src = i, t.proc = a, t.sink = r, t.meta = o;
    }(t.src, t.proc, t.sink, t.meta), t;
  }(e)).src, n = e.proc(s, e.meta);
  return e.sink(n, e.meta);
}
function M() {
  let e = {};
  return { src(s) {
    return e.pipe = s, this;
  }, done: () => e.sink, meta(s) {
    return e.meta = s, this;
  }, useProc(s) {
    return e.curProc = s, this;
  }, proc(s, n) {
    return n && this.meta(n), typeof s == "object" && (s = meta(e.curProc, s)), e.pipe = s(e.pipe, e.meta || {}), this;
  }, useSink(s) {
    return e.curSink = s, this;
  }, sink(s, n) {
    return n && this.meta(n), typeof s == "object" && (s = meta(e.curSink, s)), e.sink = s(e.pipe, e.meta || {}), this;
  }, series(...s) {
    return s.forEach((n) => this.proc(n)), this;
  }, parallel(...s) {
    return s.forEach((n) => this.sink(n)), this;
  } };
}
function N(e, s) {
  return (n) => e(n, s);
}
function Q(...e) {
  return (s, n) => e.map((t) => t(s, n));
}
function U(...e) {
  return (s, n) => e.reduce((t, i) => i(t, n), s);
}
function X(e) {
  console.log(e);
}
function m(e) {
  return typeof e == "object" ? P(e) : e;
}
function D(e) {
  let s = "";
  return e.p && (s += e.p), e.w && (s += e.w), e.a && (s += e.a), s;
}
function V(e, s, n) {
  let t = y(e);
  n && (t += n.toString());
  const i = v(e, "w+"), a = Buffer.from(s);
  k(i, a, 0, a.length, 0), k(i, t, 0, t.length, a.length), g(i, (r) => {
    if (r)
      throw r;
  });
}
function d(e, s, n) {
  let { p: t, w: i, a } = s;
  if (i)
    return s = D(s), void b(e, s.toString(), n == null ? void 0 : n.options);
  t === void 0 && a === void 0 || (t === void 0 && a ? T(e, a.toString(), n == null ? void 0 : n.options) : V(e, t, a));
}
function Y(e, s) {
  return e = m(e || (s == null ? void 0 : s.path)), y(e, (s == null ? void 0 : s.options) || "utf-8");
}
function Z(e, s) {
  let n = m(s == null ? void 0 : s.path);
  const t = F(n);
  let i, a = e !== void 0;
  if (typeof e == "object") {
    const { a: r, w: o, p: h } = e;
    if (!r && !o && !h)
      return a = !1, e;
    i = () => d(n, { a: r, w: o, p: h }, s);
  }
  return !j(n) && a && A(t, { recursive: !0 }), i ? i() : d(n, { w: e }, s), e;
}
function _(e, s) {
  return Array.isArray(e) ? void e.forEach((n) => _(n, s)) : (e = m(e), l(e).forEach((n) => {
    E(n, { recursive: !0, force: !0, ...s == null ? void 0 : s.options });
  }), e);
}
const B = "./src/task/*.js", S = { glob: "./src/**/*.js", delay: 100 };
let u;
const c = {}, O = (e) => c[e.id] = e, $ = (e) => c[e] = void 0, R = (e) => c[e] !== void 0, ee = () => process.env.VESIC_API = !0;
function se(e) {
  return !(!R(e) || !c[e].main) && typeof c[e].main == "function";
}
function q(e, s, n) {
  s = { id: e, ...s };
  const t = Date.now();
  c[e].main(s, n);
  const i = Date.now();
  return { start: t, stop: i, dur: i - t };
}
function ne(e) {
  process.env.VESIC_API === "true" ? process.emit("task", e) : e.main();
}
function z(e) {
  const s = { id: f.basename(u || "", f.extname(u || "")), url: u, ...e };
  O(s);
}
function G() {
  process.listenerCount("task") == 0 && process.on("task", z);
}
async function te(e = B) {
  G();
  const s = await l(e, {});
  for (let n of s)
    u = n, await import(f.resolve(n));
}
let p;
const ie = () => p.length > 0;
function H(e = S.glob) {
  return p = l(e), e;
}
function ae(e, s) {
  s = { ...S, ...s }, !p && H(s.glob);
  const n = { id: e, ...s };
  p.forEach((t, i) => {
    let a = !1;
    w.watch(f.resolve(t), (r, o) => {
      a || (a = !0, q(e, n, { watch: { event: r, filename: o, file: t } }), setTimeout(() => {
        a = !1;
      }, s.delay));
    });
  });
}
export {
  x as bypass,
  Y as cat,
  M as chain,
  _ as clean,
  C as dummySink,
  I as dummySrc,
  D as formatWriteObj,
  d as handleWrite,
  R as hasTask,
  ie as hasWatchables,
  ee as initApi,
  H as initWatch,
  se as isTaskRunnable,
  G as listenTask,
  te as loadTasks,
  N as meta,
  Z as mkfile,
  Q as parallel,
  V as prependFile,
  X as print,
  O as registerTask,
  q as runTask,
  U as series,
  ne as task,
  c as tasks,
  $ as unregisterTask,
  W as vesic,
  ae as watchTask
};
