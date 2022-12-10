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
    return function(e) {
      return e.map((a) => b(a));
    }(r);
  r = function(e = {}) {
    return function(a = A, n = w, i = E, l = {}) {
      e.src = a, e.proc = n, e.sink = i, e.meta = l;
    }(e.src, e.proc, e.sink, e.meta), e;
  }(r);
  let s = r.src, t = r.proc(s, r.meta);
  return r.sink(t, r.meta);
}
function m(r, s) {
  return (t) => r(t, s);
}
function D(...r) {
  return (s, t) => r.map((e) => e(s, t));
}
function V(...r) {
  return (s, t) => r.reduce((e, a) => a(e, t), s);
}
function _(r, s, t) {
  let e, a;
  return { src(n) {
    return r = n, this;
  }, done: () => t, meta(n) {
    return s = n, this;
  }, useProc(n) {
    return e = n, this;
  }, proc(n, i) {
    return i && this.meta(i), typeof n == "object" && (n = m(e, n)), r = n(r, s || {}), this;
  }, useSink(n) {
    return a = n, this;
  }, sink(n, i) {
    return i && this.meta(i), typeof n == "object" && (n = m(a, n)), t = n(r, s || {}), this;
  }, series(...n) {
    return n.forEach((i) => this.proc(i)), this;
  }, parallel(...n) {
    return n.forEach((i) => this.sink(i)), this;
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
  let t = f(s == null ? void 0 : s.path);
  const e = v(t);
  return h(e, { recursive: !0 }), d(t, r.toString(), s == null ? void 0 : s.options), r;
}
function T(r, s) {
  return Array.isArray(r) ? void r.forEach((t) => T(t)) : (r = f(r), p(r).forEach((t) => {
    y(t, { recursive: !0, force: !0, ...s == null ? void 0 : s.options });
  }), r);
}
const g = "./src/task/*.js";
let o;
const c = {}, j = (r) => c[r.id] = r, G = (r) => c[r] = void 0, H = (r) => c[r] !== void 0, J = () => process.env.VESIC_API = !0;
function K(r, s, t) {
  s = { id: r, ...s };
  const e = Date.now();
  c[r].main(s, t);
  const a = Date.now();
  return { start: e, stop: a, dur: a - e };
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
  for (let t of s)
    o = t, await import(u.resolve(t));
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
