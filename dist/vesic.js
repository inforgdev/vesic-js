import f, { mkdirSync as m, writeFileSync as p } from "fs";
import { format as h, dirname as l } from "path";
function y() {
  return () => {
  };
}
function k(r) {
  return r;
}
function d() {
}
function S(r) {
  if (Array.isArray(r))
    return function(i) {
      return i.map((o) => S(o));
    }(r);
  r = function(i = {}) {
    return function(o = y, n = k, s = d, c = {}) {
      i.src = o, i.proc = n, i.sink = s, i.meta = c;
    }(i.src, i.proc, i.sink, i.meta), i;
  }(r);
  let t = r.src, e = r.proc(t, r.meta);
  return r.sink(e, r.meta);
}
function u(r, t) {
  return (e) => r(e, t);
}
function j(...r) {
  return (t, e) => r.map((i) => i(t, e));
}
function g(...r) {
  return (t, e) => r.reduce((i, o) => o(i, e), t);
}
function v(r, t, e) {
  let i, o;
  return { src(n) {
    return r = n, this;
  }, done: () => e, meta(n) {
    return t = n, this;
  }, useProc(n) {
    return i = n, this;
  }, proc(n, s) {
    return s && this.meta(s), typeof n == "object" && (n = u(i, n)), r = n(r, t || {}), this;
  }, useSink(n) {
    return o = n, this;
  }, sink(n, s) {
    return s && this.meta(s), typeof n == "object" && (n = u(o, n)), e = n(r, t || {}), this;
  }, series(...n) {
    return n.forEach((s) => this.proc(s)), this;
  }, parallel(...n) {
    return n.forEach((s) => this.sink(s)), this;
  } };
}
function w(r) {
  console.log(r);
}
function a(r) {
  return typeof r == "object" ? h(r) : r;
}
function A(r, t) {
  return r = a(r || (t == null ? void 0 : t.path)), f.readFileSync(r, (t == null ? void 0 : t.options) || "utf-8");
}
function E(r, t) {
  let e = a(t == null ? void 0 : t.path);
  const i = l(e);
  return m(i, { recursive: !0 }), p(e, r.toString(), t == null ? void 0 : t.options), r;
}
export {
  k as bypass,
  d as dummySink,
  y as dummySrc,
  u as meta,
  j as parallel,
  w as print,
  A as readFile,
  g as series,
  v as stream,
  S as vesic,
  E as writeFile
};
