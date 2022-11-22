import f, { mkdirSync as p, writeFileSync as m } from "fs";
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
      return e.map((s) => S(s));
    }(r);
  r = function(e = {}) {
    return function(s = y, t = d, o = k, c = {}) {
      e.src = s, e.proc = t, e.sink = o, e.meta = c;
    }(e.src, e.proc, e.sink, e.meta), e;
  }(r);
  let n = r.src, i = r.proc(n, r.meta);
  return r.sink(i, r.meta);
}
function u(r, n) {
  return (i) => r(i, n);
}
function j(r, n, i) {
  let e, s;
  return { src(t) {
    return r = t, this;
  }, done: () => i, meta(t) {
    return n = t, this;
  }, useProc(t) {
    return e = t, this;
  }, proc(t) {
    return typeof t == "object" && (t = u(e, t)), r = t(r, n || {}), this;
  }, useSink(t) {
    return s = t, this;
  }, sink(t) {
    return typeof t == "object" && (t = u(s, t)), i = t(r, n || {}), this;
  }, series(...t) {
    return t.forEach((o) => this.proc(o)), this;
  }, parallel(...t) {
    return t.forEach((o) => this.sink(o)), this;
  }, exec(t, o) {
    return this.meta(o), this.proc(t);
  } };
}
function a(r) {
  return typeof r == "object" ? h(r) : r;
}
function v(r, n) {
  return r = a(r || (n == null ? void 0 : n.path)), f.readFileSync(r, (n == null ? void 0 : n.options) || "utf-8");
}
function g(r, n) {
  let i = a(n == null ? void 0 : n.path);
  const e = l(i);
  return p(e, { recursive: !0 }), m(i, r.toString(), n == null ? void 0 : n.options), r;
}
function w(r) {
  return () => r;
}
function x(r) {
  return r;
}
function A(...r) {
  return (n, i) => r.reduce((e, s) => s(e, i), n);
}
function E(...r) {
  return (n, i) => r.map((e) => e(n, i));
}
function P(r) {
  console.log(r);
}
export {
  d as bypass,
  k as dummySink,
  y as dummySrc,
  u as meta,
  E as parallel,
  P as print,
  v as readFile,
  x as ret,
  A as series,
  j as stream,
  w as val,
  S as vesic,
  g as writeFile
};
