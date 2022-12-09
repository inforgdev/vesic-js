import { readFileSync as k, mkdirSync as h, writeFileSync as d, rmSync as y } from "fs";
import u, { format as S, dirname as v } from "path";
import p from "glob/sync.js";
function A() {
  return () => {
  };
}
function w(r) {
  return r;
}
function E() {
}
function b(r) {
  if (Array.isArray(r))
    return function(t) {
      return t.map((i) => b(i));
    }(r);
  r = function(t = {}) {
    return function(i = A, n = w, a = E, l = {}) {
      t.src = i, t.proc = n, t.sink = a, t.meta = l;
    }(t.src, t.proc, t.sink, t.meta), t;
  }(r);
  let s = r.src, e = r.proc(s, r.meta);
  return r.sink(e, r.meta);
}
function m(r, s) {
  return (e) => r(e, s);
}
function D(...r) {
  return (s, e) => r.map((t) => t(s, e));
}
function V(...r) {
  return (s, e) => r.reduce((t, i) => i(t, e), s);
}
function _(r, s, e) {
  let t, i;
  return { src(n) {
    return r = n, this;
  }, done: () => e, meta(n) {
    return s = n, this;
  }, useProc(n) {
    return t = n, this;
  }, proc(n, a) {
    return a && this.meta(a), typeof n == "object" && (n = m(t, n)), r = n(r, s || {}), this;
  }, useSink(n) {
    return i = n, this;
  }, sink(n, a) {
    return a && this.meta(a), typeof n == "object" && (n = m(i, n)), e = n(r, s || {}), this;
  }, series(...n) {
    return n.forEach((a) => this.proc(a)), this;
  }, parallel(...n) {
    return n.forEach((a) => this.sink(a)), this;
  } };
}
function q(r) {
  console.log(r);
}
function f(r) {
  return typeof r == "object" ? S(r) : r;
}
function z(r, s) {
  return r = f(r || (s == null ? void 0 : s.path)), k(r, (s == null ? void 0 : s.options) || "utf-8");
}
function B(r, s) {
  let e = f(s == null ? void 0 : s.path);
  const t = v(e);
  return h(t, { recursive: !0 }), d(e, r.toString(), s == null ? void 0 : s.options), r;
}
function T(r, s) {
  return Array.isArray(r) ? void r.forEach((e) => T(e)) : (r = f(r), p(r).forEach((e) => {
    y(e, { recursive: !0, force: !0, ...s == null ? void 0 : s.options });
  }), r);
}
const g = "./src/task/*.js";
let o;
const c = {}, j = (r) => c[r.id] = r, G = (r) => c[r] = void 0, H = (r) => c[r] !== void 0, J = () => process.env.VESIC_API = !0;
function K(r) {
  const s = Date.now();
  c[r].main();
  const e = Date.now();
  return { start: s, stop: e, dur: e - s };
}
function L(r) {
  process.env.VESIC_API === "true" ? process.emit("task", r) : r.main();
}
function I(r) {
  const s = { id: u.basename(o || "", u.extname(o || "")), url: o, ...r };
  j(s);
}
function C() {
  process.listenerCount("task") == 0 && process.on("task", I);
}
async function M(r = g) {
  C();
  const s = await p(r, {});
  for (let e of s)
    o = e, await import(u.resolve(e));
}
export {
  w as bypass,
  T as clean,
  E as dummySink,
  A as dummySrc,
  H as hasTask,
  J as initApi,
  C as listenTask,
  M as loadTasks,
  m as meta,
  D as parallel,
  q as print,
  z as readFile,
  j as registerTask,
  K as runTask,
  V as series,
  _ as stream,
  L as task,
  c as tasks,
  G as unregisterTask,
  b as vesic,
  B as writeFile
};
