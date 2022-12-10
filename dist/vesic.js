import { readFileSync as k, mkdirSync as h, writeFileSync as d, rmSync as y } from "fs";
import u, { format as S, dirname as v } from "path";
import p from "glob/sync.js";
function A() {
  return () => {
  };
}
function b(s) {
  return s;
}
function w() {
}
function E(s) {
  if (Array.isArray(s))
    return function(r) {
      return r.map((a) => E(a));
    }(s);
  s = function(r = {}) {
    return function(a = A, e = b, i = w, l = {}) {
      r.src = a, r.proc = e, r.sink = i, r.meta = l;
    }(r.src, r.proc, r.sink, r.meta), r;
  }(s);
  let n = s.src, t = s.proc(n, s.meta);
  return s.sink(t, s.meta);
}
function m(s, n) {
  return (t) => s(t, n);
}
function V(...s) {
  return (n, t) => s.map((r) => r(n, t));
}
function _(...s) {
  return (n, t) => s.reduce((r, a) => a(r, t), n);
}
function q(s, n, t) {
  let r, a;
  return { src(e) {
    return s = e, this;
  }, done: () => t, meta(e) {
    return n = e, this;
  }, useProc(e) {
    return r = e, this;
  }, proc(e, i) {
    return i && this.meta(i), typeof e == "object" && (e = m(r, e)), s = e(s, n || {}), this;
  }, useSink(e) {
    return a = e, this;
  }, sink(e, i) {
    return i && this.meta(i), typeof e == "object" && (e = m(a, e)), t = e(s, n || {}), this;
  }, series(...e) {
    return e.forEach((i) => this.proc(i)), this;
  }, parallel(...e) {
    return e.forEach((i) => this.sink(i)), this;
  } };
}
function R(s) {
  console.log(s);
}
function f(s) {
  return typeof s == "object" ? S(s) : s;
}
function z(s, n) {
  return s = f(s || (n == null ? void 0 : n.path)), k(s, (n == null ? void 0 : n.options) || "utf-8");
}
function B(s, n) {
  let t = f(n == null ? void 0 : n.path);
  const r = v(t);
  return h(r, { recursive: !0 }), d(t, s.toString(), n == null ? void 0 : n.options), s;
}
function T(s, n) {
  return Array.isArray(s) ? void s.forEach((t) => T(t)) : (s = f(s), p(s).forEach((t) => {
    y(t, { recursive: !0, force: !0, ...n == null ? void 0 : n.options });
  }), s);
}
const g = "./src/task/*.js";
let c;
const o = {}, j = (s) => o[s.id] = s, G = (s) => o[s] = void 0, I = (s) => o[s] !== void 0, H = () => process.env.VESIC_API = !0;
function J(s) {
  return !(!I(s) || !o[s].main) && typeof o[s].main == "function";
}
function K(s, n, t) {
  n = { id: s, ...n };
  const r = Date.now();
  o[s].main(n, t);
  const a = Date.now();
  return { start: r, stop: a, dur: a - r };
}
function L(s) {
  process.env.VESIC_API === "true" ? process.emit("task", s) : s.main();
}
function C(s) {
  const n = { id: u.basename(c || "", u.extname(c || "")), url: c, ...s };
  j(n);
}
function F() {
  process.listenerCount("task") == 0 && process.on("task", C);
}
async function M(s = g) {
  F();
  const n = await p(s, {});
  for (let t of n)
    c = t, await import(u.resolve(t));
}
export {
  b as bypass,
  T as clean,
  w as dummySink,
  A as dummySrc,
  I as hasTask,
  H as initApi,
  J as isTaskRunnable,
  F as listenTask,
  M as loadTasks,
  m as meta,
  V as parallel,
  R as print,
  z as readFile,
  j as registerTask,
  K as runTask,
  _ as series,
  q as stream,
  L as task,
  o as tasks,
  G as unregisterTask,
  E as vesic,
  B as writeFile
};
