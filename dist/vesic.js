import A, { readFileSync as d, rmSync as E, openSync as T, writeSync as k, close as j, writeFileSync as x, appendFileSync as I, existsSync as P, mkdirSync as F, renameSync as W } from "fs";
import p, { format as S, dirname as C, parse as D } from "path";
import h from "glob/sync.js";
function N() {
  return () => {
  };
}
function V(e) {
  return e;
}
function _() {
}
function B(e) {
  if (Array.isArray(e))
    return function(i) {
      return i.map((t) => B(t));
    }(e);
  let n = (e = function(i = {}) {
    return function(t = N, o = V, a = _, r = {}) {
      i.src = t, i.proc = o, i.sink = a, i.meta = r;
    }(i.src, i.proc, i.sink, i.meta), i;
  }(e)).src, s = e.proc(n, e.meta);
  return e.sink(s, e.meta);
}
function $() {
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
function ee(e, n) {
  return (s) => e(s, n);
}
function ne(...e) {
  return (n, s) => e.map((i) => i(n, s));
}
function se(...e) {
  return (n, s) => e.reduce((i, t) => t(i, s), n);
}
function ie(e) {
  console.log(e);
}
function y(e) {
  return typeof e == "object" ? S(e) : e;
}
function te(e, n) {
  return e = y(e || (n == null ? void 0 : n.path)), d(e, (n == null ? void 0 : n.options) || "utf-8");
}
function O(e, n) {
  return Array.isArray(e) ? void e.forEach((s) => O(s, n)) : (e = y(e), h(e).forEach((s) => {
    E(s, { recursive: !0, force: !0, ...n == null ? void 0 : n.options });
  }), e);
}
function oe(e, n) {
  const s = n.header || `
`, i = n.footer || "";
  let t = [];
  if (Array.isArray(e) ? t = e : t.push(e), e === void 0 || t.length === 0)
    return;
  let o = "";
  function a(r, c, m) {
    return typeof r == "function" ? r(c, m, t.length) : r;
  }
  return t.forEach((r, c) => {
    const m = d(r), b = a(s, r, c), g = a(i, r, c);
    o += b + m + g;
  }), o;
}
function R(e) {
  let n = "";
  return e.p && (n += e.p), e.w && (n += e.w), e.a && (n += e.a), n;
}
function q(e, n, s) {
  let i = d(e);
  s && (i += s.toString());
  const t = T(e, "w+"), o = Buffer.from(n);
  k(t, o, 0, o.length, 0), k(t, i, 0, i.length, o.length), j(t, (a) => {
    if (a)
      throw a;
  });
}
function v(e, n, s) {
  let { p: i, w: t, a: o } = n;
  if (t)
    return n = R(n), void x(e, n.toString(), s == null ? void 0 : s.options);
  i === void 0 && o === void 0 || (i === void 0 && o ? I(e, o.toString(), s == null ? void 0 : s.options) : q(e, i, o));
}
function z(e) {
  const n = C(e);
  P(n) || F(n, { recursive: !0 });
}
function re(e, n) {
  let s, i = y(n == null ? void 0 : n.path), t = e !== void 0;
  if (typeof e == "object") {
    const { a: o, w: a, p: r } = e;
    if (!o && !a && !r)
      return t = !1, e;
    s = () => v(i, { a: o, w: a, p: r }, n);
  }
  return t && mkdirIfNotExists(i), s ? s() : v(i, { w: e }, n), e;
}
function G(e, n) {
  if (Array.isArray(e))
    return void e.forEach((t) => G(t, n));
  let s = D(e), i = n.path;
  if (typeof i == "object") {
    const { root: t, dir: o, base: a, ext: r, name: c } = n.path;
    r === void 0 && c === void 0 || (s.base = void 0), t !== void 0 && (s.root = t), o !== void 0 && (s.dir = o), a !== void 0 && (s.base = a), r !== void 0 && (s.ext = r), c !== void 0 && (s.name = c), i = S(s);
  }
  return z(i), W(e, i), i;
}
const H = "./src/task/*.js", w = { glob: "./src/**/*.js", delay: 100 };
let f;
const u = {}, J = (e) => u[e.id] = e, ae = (e) => u[e] = void 0, K = (e) => u[e] !== void 0, ce = () => process.env.VESIC_API = !0;
function ue(e) {
  return !(!K(e) || !u[e].main) && typeof u[e].main == "function";
}
function L(e, n, s) {
  n = { id: e, ...n };
  const i = Date.now();
  u[e].main(n, s);
  const t = Date.now();
  return { start: i, stop: t, dur: t - i };
}
function fe(e) {
  process.env.VESIC_API === "true" ? process.emit("task", e) : e.main();
}
function M(e) {
  const n = { id: p.basename(f || "", p.extname(f || "")), url: f, ...e };
  J(n);
}
function Q() {
  process.listenerCount("task") == 0 && process.on("task", M);
}
async function pe(e = H) {
  Q();
  const n = await h(e, {});
  for (let s of n)
    f = s, await import(p.resolve(s));
}
let l;
const le = () => l.length > 0;
function U(e = w.glob) {
  return l = h(e), e;
}
function me(e, n) {
  n = { ...w, ...n }, !l && U(n.glob);
  const s = { id: e, ...n };
  l.forEach((i, t) => {
    let o = !1;
    A.watch(p.resolve(i), (a, r) => {
      o || (o = !0, L(e, s, { watch: { event: a, filename: r, file: i } }), setTimeout(() => {
        o = !1;
      }, n.delay));
    });
  });
}
export {
  V as bypass,
  te as cat,
  $ as chain,
  O as clean,
  oe as concat,
  _ as dummySink,
  N as dummySrc,
  R as formatWriteObj,
  v as handleWrite,
  K as hasTask,
  le as hasWatchables,
  ce as initApi,
  U as initWatch,
  ue as isTaskRunnable,
  Q as listenTask,
  pe as loadTasks,
  ee as meta,
  z as mkdirIfNotExists,
  re as mkfile,
  G as mv,
  ne as parallel,
  q as prependFile,
  ie as print,
  J as registerTask,
  L as runTask,
  se as series,
  fe as task,
  u as tasks,
  ae as unregisterTask,
  B as vesic,
  me as watchTask
};
