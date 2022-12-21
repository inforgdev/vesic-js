import A, { readFileSync as h, openSync as E, writeSync as k, close as T, writeFileSync as j, appendFileSync as x, existsSync as P, mkdirSync as F, rmSync as I, renameSync as W } from "fs";
import d from "glob/sync.js";
import p, { format as S, dirname as C, parse as D } from "path";
function V() {
  return () => {
  };
}
function _(e) {
  return e;
}
function B() {
}
function O(e) {
  if (Array.isArray(e))
    return function(o) {
      return o.map((t) => O(t));
    }(e);
  let n = (e = function(o = {}) {
    return function(t = V, i = _, a = B, r = {}) {
      o.src = t, o.proc = i, o.sink = a, o.meta = r;
    }(o.src, o.proc, o.sink, o.meta), o;
  }(e)).src, s = e.proc(n, e.meta);
  return e.sink(s, e.meta);
}
function Z() {
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
function $(e, n) {
  return (s) => e(s, n);
}
function ee(...e) {
  return (n, s) => e.map((o) => o(n, s));
}
function ne(...e) {
  return (n, s) => e.reduce((o, t) => t(o, s), n);
}
function se(e) {
  console.log(e);
}
function y(e) {
  return typeof e == "object" ? S(e) : e;
}
function R(e) {
  let n = "";
  return e.p && (n += e.p), e.w && (n += e.w), e.a && (n += e.a), n;
}
function q(e, n, s) {
  let o = h(e);
  s && (o += s.toString());
  const t = E(e, "w+"), i = Buffer.from(n);
  k(t, i, 0, i.length, 0), k(t, o, 0, o.length, i.length), T(t, (a) => {
    if (a)
      throw a;
  });
}
function v(e, n, s) {
  let { p: o, w: t, a: i } = n;
  if (t)
    return n = R(n), void j(e, n.toString(), s == null ? void 0 : s.options);
  o === void 0 && i === void 0 || (o === void 0 && i ? x(e, i.toString(), s == null ? void 0 : s.options) : q(e, o, i));
}
function oe(e, n) {
  return e = y(e || (n == null ? void 0 : n.path)), h(e, (n == null ? void 0 : n.options) || "utf-8");
}
function te(e, n) {
  let s = y(n == null ? void 0 : n.path);
  const o = C(s);
  let t, i = e !== void 0;
  if (typeof e == "object") {
    const { a, w: r, p: c } = e;
    if (!a && !r && !c)
      return i = !1, e;
    t = () => v(s, { a, w: r, p: c }, n);
  }
  return !P(s) && i && F(o, { recursive: !0 }), t ? t() : v(s, { w: e }, n), e;
}
function z(e, n) {
  return Array.isArray(e) ? void e.forEach((s) => z(s, n)) : (e = y(e), d(e).forEach((s) => {
    I(s, { recursive: !0, force: !0, ...n == null ? void 0 : n.options });
  }), e);
}
function G(e, n) {
  if (Array.isArray(e))
    return void e.forEach((t) => G(t, n));
  let s = D(e), o = n.path;
  if (typeof o == "object") {
    const { root: t, dir: i, base: a, ext: r, name: c } = n.path;
    r === void 0 && c === void 0 || (s.base = void 0), t !== void 0 && (s.root = t), i !== void 0 && (s.dir = i), a !== void 0 && (s.base = a), r !== void 0 && (s.ext = r), c !== void 0 && (s.name = c), o = S(s);
  }
  return W(e, o), o;
}
function ie(e, n) {
  const s = n.header || `
`, o = n.footer || "";
  let t = [];
  if (Array.isArray(e) ? t = e : t.push(e), e === void 0 || t.length === 0)
    return;
  let i = "";
  function a(r, c, m) {
    return typeof r == "function" ? r(c, m, t.length) : r;
  }
  return t.forEach((r, c) => {
    const m = h(r), b = a(s, r, c), g = a(o, r, c);
    i += b + m + g;
  }), i;
}
const H = "./src/task/*.js", w = { glob: "./src/**/*.js", delay: 100 };
let f;
const u = {}, J = (e) => u[e.id] = e, re = (e) => u[e] = void 0, K = (e) => u[e] !== void 0, ae = () => process.env.VESIC_API = !0;
function ce(e) {
  return !(!K(e) || !u[e].main) && typeof u[e].main == "function";
}
function L(e, n, s) {
  n = { id: e, ...n };
  const o = Date.now();
  u[e].main(n, s);
  const t = Date.now();
  return { start: o, stop: t, dur: t - o };
}
function ue(e) {
  process.env.VESIC_API === "true" ? process.emit("task", e) : e.main();
}
function M(e) {
  const n = { id: p.basename(f || "", p.extname(f || "")), url: f, ...e };
  J(n);
}
function N() {
  process.listenerCount("task") == 0 && process.on("task", M);
}
async function fe(e = H) {
  N();
  const n = await d(e, {});
  for (let s of n)
    f = s, await import(p.resolve(s));
}
let l;
const pe = () => l.length > 0;
function Q(e = w.glob) {
  return l = d(e), e;
}
function le(e, n) {
  n = { ...w, ...n }, !l && Q(n.glob);
  const s = { id: e, ...n };
  l.forEach((o, t) => {
    let i = !1;
    A.watch(p.resolve(o), (a, r) => {
      i || (i = !0, L(e, s, { watch: { event: a, filename: r, file: o } }), setTimeout(() => {
        i = !1;
      }, n.delay));
    });
  });
}
export {
  _ as bypass,
  oe as cat,
  Z as chain,
  z as clean,
  ie as concat,
  B as dummySink,
  V as dummySrc,
  R as formatWriteObj,
  v as handleWrite,
  K as hasTask,
  pe as hasWatchables,
  ae as initApi,
  Q as initWatch,
  ce as isTaskRunnable,
  N as listenTask,
  fe as loadTasks,
  $ as meta,
  te as mkfile,
  G as mv,
  ee as parallel,
  q as prependFile,
  se as print,
  J as registerTask,
  L as runTask,
  ne as series,
  ue as task,
  u as tasks,
  re as unregisterTask,
  O as vesic,
  le as watchTask
};
