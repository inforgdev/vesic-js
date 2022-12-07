import f, { mkdirSync as m, writeFileSync as p, rmSync as h } from "fs";
import { format as l, dirname as y } from "path";
import d from "glob/sync.js";
function k() {
  return () => {
  };
}
function S(t) {
  return t;
}
function b() {
}
function j(t) {
  if (Array.isArray(t))
    return function(i) {
      return i.map((o) => j(o));
    }(t);
  t = function(i = {}) {
    return function(o = k, n = S, s = b, c = {}) {
      i.src = o, i.proc = n, i.sink = s, i.meta = c;
    }(i.src, i.proc, i.sink, i.meta), i;
  }(t);
  let r = t.src, e = t.proc(r, t.meta);
  return t.sink(e, t.meta);
}
function u(t, r) {
  return (e) => t(e, r);
}
function g(...t) {
  return (r, e) => t.map((i) => i(r, e));
}
function w(...t) {
  return (r, e) => t.reduce((i, o) => o(i, e), r);
}
function x(t, r, e) {
  let i, o;
  return { src(n) {
    return t = n, this;
  }, done: () => e, meta(n) {
    return r = n, this;
  }, useProc(n) {
    return i = n, this;
  }, proc(n, s) {
    return s && this.meta(s), typeof n == "object" && (n = u(i, n)), t = n(t, r || {}), this;
  }, useSink(n) {
    return o = n, this;
  }, sink(n, s) {
    return s && this.meta(s), typeof n == "object" && (n = u(o, n)), e = n(t, r || {}), this;
  }, series(...n) {
    return n.forEach((s) => this.proc(s)), this;
  }, parallel(...n) {
    return n.forEach((s) => this.sink(s)), this;
  } };
}
function P(t) {
  console.log(t);
}
function a(t) {
  return typeof t == "object" ? l(t) : t;
}
function q(t, r) {
  return t = a(t || (r == null ? void 0 : r.path)), f.readFileSync(t, (r == null ? void 0 : r.options) || "utf-8");
}
function z(t, r) {
  let e = a(r == null ? void 0 : r.path);
  const i = y(e);
  return m(i, { recursive: !0 }), p(e, t.toString(), r == null ? void 0 : r.options), t;
}
function v(t, r) {
  return Array.isArray(t) ? void t.forEach((e) => v(e)) : (t = a(t), d(t).forEach((e) => {
    h(e, { recursive: !0, force: !0, ...r == null ? void 0 : r.options });
  }), t);
}
export {
  S as bypass,
  v as clean,
  b as dummySink,
  k as dummySrc,
  u as meta,
  g as parallel,
  P as print,
  q as readFile,
  w as series,
  x as stream,
  j as vesic,
  z as writeFile
};
