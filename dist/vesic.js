import E, { existsSync as d, readFileSync as h, rmSync as T, openSync as j, writeSync as v, close as x, writeFileSync as I, appendFileSync as P, mkdirSync as F, renameSync as W } from "fs";
import p, { format as w, dirname as C, parse as D } from "path";
import y from "glob/sync.js";
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
    return function(s) {
      return s.map((i) => B(i));
    }(e);
  let n = (e = function(s = {}) {
    return function(i = N, t = V, o = _, a = {}) {
      s.src = i, s.proc = t, s.sink = o, s.meta = a;
    }(s.src, s.proc, s.sink, s.meta), s;
  }(e)).src, r = e.proc(n, e.meta);
  return e.sink(r, e.meta);
}
function $() {
  let e = {};
  return { src(n) {
    return e.pipe = n, this;
  }, done: () => e.sink, meta(n) {
    return e.meta = n, this;
  }, useProc(n) {
    return e.curProc = n, this;
  }, proc(n, r) {
    return r && this.meta(r), typeof n == "object" && (n = meta(e.curProc, n)), e.pipe = n(e.pipe, e.meta || {}), this;
  }, useSink(n) {
    return e.curSink = n, this;
  }, sink(n, r) {
    return r && this.meta(r), typeof n == "object" && (n = meta(e.curSink, n)), e.sink = n(e.pipe, e.meta || {}), this;
  }, series(...n) {
    return n.forEach((r) => this.proc(r)), this;
  }, parallel(...n) {
    return n.forEach((r) => this.sink(r)), this;
  } };
}
function ee(e, n) {
  return (r) => e(r, n);
}
function ne(...e) {
  return (n, r) => e.map((s) => s(n, r));
}
function re(...e) {
  return (n, r) => e.reduce((s, i) => i(s, r), n);
}
function se(e) {
  console.log(e);
}
function k(e) {
  return typeof e == "object" ? w(e) : e;
}
function ie(e, n) {
  if (e = k(e || (n == null ? void 0 : n.path)), d(e))
    return h(e, (n == null ? void 0 : n.options) || "utf-8");
}
function O(e, n) {
  return Array.isArray(e) ? void e.forEach((r) => O(r, n)) : (e = k(e), y(e).forEach((r) => {
    T(r, { recursive: !0, force: !0, ...n == null ? void 0 : n.options });
  }), e);
}
function te(e, n) {
  const r = n.header || `
`, s = n.footer || "";
  let i = [];
  if (Array.isArray(e) ? i = e : i.push(e), e === void 0 || i.length === 0)
    return;
  let t = "";
  function o(a, c, m) {
    return typeof a == "function" ? a(c, m, i.length) : a;
  }
  return i.forEach((a, c) => {
    const m = d(a) ? h(a) : "", g = o(r, a, c), A = o(s, a, c);
    t += g + m + A;
  }), t;
}
function R(e) {
  let n = "";
  return e.p && (n += e.p), e.w && (n += e.w), e.a && (n += e.a), n;
}
function q(e, n, r) {
  let s = h(e);
  r && (s += r.toString());
  const i = j(e, "w+"), t = Buffer.from(n);
  v(i, t, 0, t.length, 0), v(i, s, 0, s.length, t.length), x(i, (o) => {
    if (o)
      throw o;
  });
}
function S(e, n, r) {
  let { p: s, w: i, a: t } = n;
  if (i)
    return n = R(n), void I(e, n.toString(), r == null ? void 0 : r.options);
  s === void 0 && t === void 0 || (s === void 0 && t ? P(e, t.toString(), r == null ? void 0 : r.options) : q(e, s, t));
}
function z(e) {
  const n = C(e);
  d(n) || F(n, { recursive: !0 });
}
function ae(e, n) {
  let r, s = k(n == null ? void 0 : n.path), i = e !== void 0;
  if (typeof e == "object") {
    const { a: t, w: o, p: a } = e;
    if (!t && !o && !a)
      return i = !1, e;
    r = () => S(s, { a: t, w: o, p: a }, n);
  }
  return i && mkdirIfNotExists(s), r ? r() : S(s, { w: e }, n), e;
}
function G(e, n) {
  if (Array.isArray(e))
    return void e.forEach((i) => G(i, n));
  let r = D(e), s = n.path;
  if (typeof s == "object") {
    const { root: i, dir: t, base: o, ext: a, name: c } = n.path;
    a === void 0 && c === void 0 || (r.base = void 0), i !== void 0 && (r.root = i), t !== void 0 && (r.dir = t), o !== void 0 && (r.base = o), a !== void 0 && (r.ext = a), c !== void 0 && (r.name = c), s = w(r);
  }
  return z(s), W(e, s), s;
}
const H = "./src/task/*.js", b = { glob: "./src/**/*.js", delay: 100 };
let f;
const u = {}, J = (e) => u[e.id] = e, oe = (e) => u[e] = void 0, K = (e) => u[e] !== void 0, ce = () => process.env.VESIC_API = !0;
function ue(e) {
  return !(!K(e) || !u[e].main) && typeof u[e].main == "function";
}
function L(e, n, r) {
  n = { id: e, ...n };
  const s = Date.now();
  u[e].main(n, r);
  const i = Date.now();
  return { start: s, stop: i, dur: i - s };
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
  const n = await y(e, {});
  for (let r of n)
    f = r, await import(p.resolve(r));
}
let l;
const le = () => l.length > 0;
function U(e = b.glob) {
  return l = y(e), e;
}
function me(e, n) {
  n = { ...b, ...n }, !l && U(n.glob);
  const r = { id: e, ...n };
  l.forEach((s, i) => {
    let t = !1;
    E.watch(p.resolve(s), (o, a) => {
      t || (t = !0, L(e, r, { watch: { event: o, filename: a, file: s } }), setTimeout(() => {
        t = !1;
      }, n.delay));
    });
  });
}
export {
  V as bypass,
  ie as cat,
  $ as chain,
  O as clean,
  te as concat,
  _ as dummySink,
  N as dummySrc,
  R as formatWriteObj,
  S as handleWrite,
  K as hasTask,
  le as hasWatchables,
  ce as initApi,
  U as initWatch,
  ue as isTaskRunnable,
  Q as listenTask,
  pe as loadTasks,
  ee as meta,
  z as mkdirIfNotExists,
  ae as mkfile,
  G as mv,
  ne as parallel,
  q as prependFile,
  se as print,
  J as registerTask,
  L as runTask,
  re as series,
  fe as task,
  u as tasks,
  oe as unregisterTask,
  B as vesic,
  me as watchTask
};
