import d, { readFileSync as y, mkdirSync as v, writeFileSync as b, rmSync as S } from "fs";
import u, { format as w, dirname as T } from "path";
import m from "glob/sync.js";
function g() {
  return () => {
  };
}
function A(s) {
  return s;
}
function E() {
}
function j(s) {
  if (Array.isArray(s))
    return function(r) {
      return r.map((i) => j(i));
    }(s);
  s = function(r = {}) {
    return function(i = g, n = A, a = E, l = {}) {
      r.src = i, r.proc = n, r.sink = a, r.meta = l;
    }(r.src, r.proc, r.sink, r.meta), r;
  }(s);
  let e = s.src, t = s.proc(e, s.meta);
  return s.sink(t, s.meta);
}
function h(s, e) {
  return (t) => s(t, e);
}
function B(...s) {
  return (e, t) => s.map((r) => r(e, t));
}
function G(...s) {
  return (e, t) => s.reduce((r, i) => i(r, t), e);
}
function H(s, e, t) {
  let r, i;
  return { src(n) {
    return s = n, this;
  }, done: () => t, meta(n) {
    return e = n, this;
  }, useProc(n) {
    return r = n, this;
  }, proc(n, a) {
    return a && this.meta(a), typeof n == "object" && (n = h(r, n)), s = n(s, e || {}), this;
  }, useSink(n) {
    return i = n, this;
  }, sink(n, a) {
    return a && this.meta(a), typeof n == "object" && (n = h(i, n)), t = n(s, e || {}), this;
  }, series(...n) {
    return n.forEach((a) => this.proc(a)), this;
  }, parallel(...n) {
    return n.forEach((a) => this.sink(a)), this;
  } };
}
function R(s) {
  console.log(s);
}
function p(s) {
  return typeof s == "object" ? w(s) : s;
}
function J(s, e) {
  return s = p(s || (e == null ? void 0 : e.path)), y(s, (e == null ? void 0 : e.options) || "utf-8");
}
function K(s, e) {
  let t = p(e == null ? void 0 : e.path);
  const r = T(t);
  return v(r, { recursive: !0 }), b(t, s.toString(), e == null ? void 0 : e.options), s;
}
function F(s, e) {
  return Array.isArray(s) ? void s.forEach((t) => F(t)) : (s = p(s), m(s).forEach((t) => {
    S(t, { recursive: !0, force: !0, ...e == null ? void 0 : e.options });
  }), s);
}
const I = "./src/task/*.js", k = { glob: "./src/**/*.js", delay: 100 };
let c;
const o = {}, C = (s) => o[s.id] = s, L = (s) => o[s] = void 0, P = (s) => o[s] !== void 0, M = () => process.env.VESIC_API = !0;
function N(s) {
  return !(!P(s) || !o[s].main) && typeof o[s].main == "function";
}
function x(s, e, t) {
  e = { id: s, ...e };
  const r = Date.now();
  o[s].main(e, t);
  const i = Date.now();
  return { start: r, stop: i, dur: i - r };
}
function O(s) {
  process.env.VESIC_API === "true" ? process.emit("task", s) : s.main();
}
function D(s) {
  const e = { id: u.basename(c || "", u.extname(c || "")), url: c, ...s };
  C(e);
}
function V() {
  process.listenerCount("task") == 0 && process.on("task", D);
}
async function Q(s = I) {
  V();
  const e = await m(s, {});
  for (let t of e)
    c = t, await import(u.resolve(t));
}
let f;
const U = () => f.length > 0;
function _(s = k.glob) {
  return f = m(s), s;
}
function X(s, e) {
  e = { ...k, ...e }, !f && _(e.glob);
  const t = { id: s, ...e };
  f.forEach((r, i) => {
    let n = !1;
    d.watch(u.resolve(r), (a, l) => {
      n || (n = !0, x(s, t, { watch: { event: a, filename: l, file: r } }), setTimeout(() => {
        n = !1;
      }, e.delay));
    });
  });
}
export {
  A as bypass,
  H as chain,
  F as clean,
  E as dummySink,
  g as dummySrc,
  P as hasTask,
  U as hasWatchables,
  M as initApi,
  _ as initWatch,
  N as isTaskRunnable,
  V as listenTask,
  Q as loadTasks,
  h as meta,
  B as parallel,
  R as print,
  J as readFile,
  C as registerTask,
  x as runTask,
  G as series,
  O as task,
  o as tasks,
  L as unregisterTask,
  j as vesic,
  X as watchTask,
  K as writeFile
};
