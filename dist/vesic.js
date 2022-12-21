import w, { readFileSync as y, openSync as b, writeSync as h, close as g, writeFileSync as A, appendFileSync as T, existsSync as j, mkdirSync as E, rmSync as x, renameSync as P } from "fs";
import m from "glob/sync.js";
import p, { format as v, dirname as F, parse as I } from "path";
function W() {
  return () => {
  };
}
function C(e) {
  return e;
}
function D() {
}
function V(e) {
  if (Array.isArray(e))
    return function(t) {
      return t.map((i) => V(i));
    }(e);
  let s = (e = function(t = {}) {
    return function(i = W, a = C, o = D, r = {}) {
      t.src = i, t.proc = a, t.sink = o, t.meta = r;
    }(t.src, t.proc, t.sink, t.meta), t;
  }(e)).src, n = e.proc(s, e.meta);
  return e.sink(n, e.meta);
}
function U() {
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
function X(e, s) {
  return (n) => e(n, s);
}
function Y(...e) {
  return (s, n) => e.map((t) => t(s, n));
}
function Z(...e) {
  return (s, n) => e.reduce((t, i) => i(t, n), s);
}
function $(e) {
  console.log(e);
}
function d(e) {
  return typeof e == "object" ? v(e) : e;
}
function _(e) {
  let s = "";
  return e.p && (s += e.p), e.w && (s += e.w), e.a && (s += e.a), s;
}
function B(e, s, n) {
  let t = y(e);
  n && (t += n.toString());
  const i = b(e, "w+"), a = Buffer.from(s);
  h(i, a, 0, a.length, 0), h(i, t, 0, t.length, a.length), g(i, (o) => {
    if (o)
      throw o;
  });
}
function k(e, s, n) {
  let { p: t, w: i, a } = s;
  if (i)
    return s = _(s), void A(e, s.toString(), n == null ? void 0 : n.options);
  t === void 0 && a === void 0 || (t === void 0 && a ? T(e, a.toString(), n == null ? void 0 : n.options) : B(e, t, a));
}
function ee(e, s) {
  return e = d(e || (s == null ? void 0 : s.path)), y(e, (s == null ? void 0 : s.options) || "utf-8");
}
function se(e, s) {
  let n = d(s == null ? void 0 : s.path);
  const t = F(n);
  let i, a = e !== void 0;
  if (typeof e == "object") {
    const { a: o, w: r, p: c } = e;
    if (!o && !r && !c)
      return a = !1, e;
    i = () => k(n, { a: o, w: r, p: c }, s);
  }
  return !j(n) && a && E(t, { recursive: !0 }), i ? i() : k(n, { w: e }, s), e;
}
function O(e, s) {
  return Array.isArray(e) ? void e.forEach((n) => O(n, s)) : (e = d(e), m(e).forEach((n) => {
    x(n, { recursive: !0, force: !0, ...s == null ? void 0 : s.options });
  }), e);
}
function R(e, s) {
  if (Array.isArray(e))
    return void e.forEach((i) => R(i, s));
  let n = I(e), t = s.path;
  if (typeof t == "object") {
    const { root: i, dir: a, base: o, ext: r, name: c } = s.path;
    r === void 0 && c === void 0 || (n.base = void 0), i !== void 0 && (n.root = i), a !== void 0 && (n.dir = a), o !== void 0 && (n.base = o), r !== void 0 && (n.ext = r), c !== void 0 && (n.name = c), t = v(n);
  }
  return P(e, t), t;
}
const q = "./src/task/*.js", S = { glob: "./src/**/*.js", delay: 100 };
let f;
const u = {}, z = (e) => u[e.id] = e, ne = (e) => u[e] = void 0, G = (e) => u[e] !== void 0, te = () => process.env.VESIC_API = !0;
function ie(e) {
  return !(!G(e) || !u[e].main) && typeof u[e].main == "function";
}
function H(e, s, n) {
  s = { id: e, ...s };
  const t = Date.now();
  u[e].main(s, n);
  const i = Date.now();
  return { start: t, stop: i, dur: i - t };
}
function ae(e) {
  process.env.VESIC_API === "true" ? process.emit("task", e) : e.main();
}
function J(e) {
  const s = { id: p.basename(f || "", p.extname(f || "")), url: f, ...e };
  z(s);
}
function K() {
  process.listenerCount("task") == 0 && process.on("task", J);
}
async function oe(e = q) {
  K();
  const s = await m(e, {});
  for (let n of s)
    f = n, await import(p.resolve(n));
}
let l;
const re = () => l.length > 0;
function L(e = S.glob) {
  return l = m(e), e;
}
function ce(e, s) {
  s = { ...S, ...s }, !l && L(s.glob);
  const n = { id: e, ...s };
  l.forEach((t, i) => {
    let a = !1;
    w.watch(p.resolve(t), (o, r) => {
      a || (a = !0, H(e, n, { watch: { event: o, filename: r, file: t } }), setTimeout(() => {
        a = !1;
      }, s.delay));
    });
  });
}
export {
  C as bypass,
  ee as cat,
  U as chain,
  O as clean,
  D as dummySink,
  W as dummySrc,
  _ as formatWriteObj,
  k as handleWrite,
  G as hasTask,
  re as hasWatchables,
  te as initApi,
  L as initWatch,
  ie as isTaskRunnable,
  K as listenTask,
  oe as loadTasks,
  X as meta,
  se as mkfile,
  R as mv,
  Y as parallel,
  B as prependFile,
  $ as print,
  z as registerTask,
  H as runTask,
  Z as series,
  ae as task,
  u as tasks,
  ne as unregisterTask,
  V as vesic,
  ce as watchTask
};
