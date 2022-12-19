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
  let n = (e = function(t = {}) {
    return function(i = I, a = x, r = C, o = {}) {
      t.src = i, t.proc = a, t.sink = r, t.meta = o;
    }(t.src, t.proc, t.sink, t.meta), t;
  }(e)).src, s = e.proc(n, e.meta);
  return e.sink(s, e.meta);
}
function M() {
  let e = {};
  return { src(n) {
    return e.pipe = n, this;
  }, done: () => e.sink, meta(n) {
    return e.meta = n, this;
  }, useProc(n) {
    return e.curProc = n, this;
  }, proc(n, s) {
    return s && this.meta(s), typeof n == "object" && (n = meta(e.curProc, n)), e.pipe = n(e.pipe, e.meta || {}), this;
  }, useSink(n) {
    return e.curSink = n, this;
  }, sink(n, s) {
    return s && this.meta(s), typeof n == "object" && (n = meta(e.curSink, n)), e.sink = n(e.pipe, e.meta || {}), this;
  }, series(...n) {
    return n.forEach((s) => this.proc(s)), this;
  }, parallel(...n) {
    return n.forEach((s) => this.sink(s)), this;
  } };
}
function N(e, n) {
  return (s) => e(s, n);
}
function Q(...e) {
  return (n, s) => e.map((t) => t(n, s));
}
function U(...e) {
  return (n, s) => e.reduce((t, i) => i(t, s), n);
}
function X(e) {
  console.log(e);
}
function m(e) {
  return typeof e == "object" ? P(e) : e;
}
function D(e) {
  let n = "";
  return e.p && (n += e.p), e.w && (n += e.w), e.a && (n += e.a), n;
}
function V(e, n, s) {
  let t = y(e);
  s && (t += s.toString());
  const i = v(e, "w+"), a = Buffer.from(n);
  k(i, a, 0, a.length, 0), k(i, t, 0, t.length, a.length), g(i, (r) => {
    if (r)
      throw r;
  });
}
function d(e, n, s) {
  let { p: t, w: i, a } = n;
  if (i)
    return n = D(n), void b(e, n.toString(), s == null ? void 0 : s.options);
  t === void 0 && a === void 0 || (t === void 0 && a ? T(e, a.toString(), s == null ? void 0 : s.options) : V(e, t, a));
}
function Y(e, n) {
  return e = m(e || (n == null ? void 0 : n.path)), y(e, (n == null ? void 0 : n.options) || "utf-8");
}
function Z(e, n) {
  let s = m(n == null ? void 0 : n.path);
  const t = F(s);
  let i, a = e !== void 0;
  if (typeof e == "object") {
    const { a: r, w: o, p: h } = e;
    if (!r && !o && !h)
      return a = !1, e;
    i = () => d(s, { a: r, w: o, p: h }, n);
  }
  return !j(s) && a && A(t, { recursive: !0 }), i ? i() : d(s, { w: e }, n), e;
}
function _(e, n) {
  return Array.isArray(e) ? void e.forEach((s) => _(s)) : (e = m(e), l(e).forEach((s) => {
    E(s, { recursive: !0, force: !0, ...n == null ? void 0 : n.options });
  }), e);
}
const B = "./src/task/*.js", S = { glob: "./src/**/*.js", delay: 100 };
let u;
const c = {}, O = (e) => c[e.id] = e, $ = (e) => c[e] = void 0, R = (e) => c[e] !== void 0, ee = () => process.env.VESIC_API = !0;
function ne(e) {
  return !(!R(e) || !c[e].main) && typeof c[e].main == "function";
}
function q(e, n, s) {
  n = { id: e, ...n };
  const t = Date.now();
  c[e].main(n, s);
  const i = Date.now();
  return { start: t, stop: i, dur: i - t };
}
function se(e) {
  process.env.VESIC_API === "true" ? process.emit("task", e) : e.main();
}
function z(e) {
  const n = { id: f.basename(u || "", f.extname(u || "")), url: u, ...e };
  O(n);
}
function G() {
  process.listenerCount("task") == 0 && process.on("task", z);
}
async function te(e = B) {
  G();
  const n = await l(e, {});
  for (let s of n)
    u = s, await import(f.resolve(s));
}
let p;
const ie = () => p.length > 0;
function H(e = S.glob) {
  return p = l(e), e;
}
function ae(e, n) {
  n = { ...S, ...n }, !p && H(n.glob);
  const s = { id: e, ...n };
  p.forEach((t, i) => {
    let a = !1;
    w.watch(f.resolve(t), (r, o) => {
      a || (a = !0, q(e, s, { watch: { event: r, filename: o, file: t } }), setTimeout(() => {
        a = !1;
      }, n.delay));
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
  ne as isTaskRunnable,
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
  se as task,
  c as tasks,
  $ as unregisterTask,
  W as vesic,
  ae as watchTask
};
