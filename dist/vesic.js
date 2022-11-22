import f, { mkdirSync as m, writeFileSync as p } from "fs";
import { format as h, dirname as l } from "path";
function y() {
  return () => {
  };
}
function d(r) {
  return r;
}
function k() {
}
function S(r) {
  if (Array.isArray(r))
    return function(e) {
      return e.map((u) => S(u));
    }(r);
  r = function(e = {}) {
    return function(u = y, n = d, s = k, c = {}) {
      e.src = u, e.proc = n, e.sink = s, e.meta = c;
    }(e.src, e.proc, e.sink, e.meta), e;
  }(r);
  let t = r.src, i = r.proc(t, r.meta);
  return r.sink(i, r.meta);
}
function o(r, t) {
  return (i) => r(i, t);
}
function j(r, t, i) {
  let e, u;
  return { src(n) {
    return r = n, this;
  }, done: () => i, meta(n) {
    return t = n, this;
  }, useProc(n) {
    return e = n, this;
  }, proc(n, s) {
    return s && this.meta(s), typeof n == "object" && (n = o(e, n)), r = n(r, t || {}), this;
  }, useSink(n) {
    return u = n, this;
  }, sink(n, s) {
    return s && this.meta(s), typeof n == "object" && (n = o(u, n)), i = n(r, t || {}), this;
  }, series(...n) {
    return n.forEach((s) => this.proc(s)), this;
  }, parallel(...n) {
    return n.forEach((s) => this.sink(s)), this;
  } };
}
function a(r) {
  return typeof r == "object" ? h(r) : r;
}
function v(r, t) {
  return r = a(r || (t == null ? void 0 : t.path)), f.readFileSync(r, (t == null ? void 0 : t.options) || "utf-8");
}
function g(r, t) {
  let i = a(t == null ? void 0 : t.path);
  const e = l(i);
  return m(e, { recursive: !0 }), p(i, r.toString(), t == null ? void 0 : t.options), r;
}
function w(r) {
  return () => r;
}
function A(r) {
  return r;
}
function E(...r) {
  return (t, i) => r.reduce((e, u) => u(e, i), t);
}
function x(...r) {
  return (t, i) => r.map((e) => e(t, i));
}
function P(r) {
  console.log(r);
}
export {
  d as bypass,
  k as dummySink,
  y as dummySrc,
  o as meta,
  x as parallel,
  P as print,
  v as readFile,
  A as ret,
  E as series,
  j as stream,
  w as val,
  S as vesic,
  g as writeFile
};
