import a, { mkdirSync as m, writeFileSync as p } from "fs";
import { format as l, dirname as h } from "path";
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
    return function(s = y, n = d, u = k, f = {}) {
      e.src = s, e.proc = n, e.sink = u, e.meta = f;
    }(e.src, e.proc, e.sink, e.meta), e;
  }(r);
  let t = r.src(), i = r.proc(t, r.meta);
  return r.sink(i, r.meta);
}
function c(r, t) {
  return (i) => r(i, t);
}
function j(r, t, i) {
  let e, s;
  return { src(n) {
    return r = n(), this;
  }, done: () => i, meta(n) {
    return t = n, this;
  }, useProc(n) {
    return e = n, this;
  }, proc(n) {
    return typeof n == "object" && (n = c(e, n)), r = n(r, t || {}), this;
  }, useSink(n) {
    return s = n, this;
  }, sink(n) {
    return typeof n == "object" && (n = c(s, n)), i = n(r, t || {}), this;
  }, series(...n) {
    return n.forEach((u) => this.proc(u)), this;
  }, parallel(...n) {
    return n.forEach((u) => this.sink(u)), this;
  }, exec(n, u) {
    return this.meta(u), this.proc(n);
  } };
}
function o(r) {
  return typeof r == "object" ? l(r) : r;
}
function v(r, t = "utf-8") {
  return r = o(r), () => a.readFileSync(r, t);
}
function g(r, t) {
  let i = o(t.path);
  const e = h(i);
  m(e, { recursive: !0 }), p(i, r.toString(), t.options);
}
function x(r, t) {
  return r = o(r), a.readFileSync(r, t.options || "utf-8");
}
function A(r) {
  return () => r;
}
function E(r) {
  return r;
}
function w(...r) {
  return (t, i) => r.reduce((e, s) => s(e, i), t);
}
function P(...r) {
  return (t, i) => r.map((e) => e(t, i));
}
function q(r) {
  console.log(r);
}
export {
  d as bypass,
  k as dummySink,
  y as dummySrc,
  v as file,
  c as meta,
  g as mkfile,
  P as parallel,
  q as print,
  x as readFile,
  E as ret,
  w as series,
  j as stream,
  A as val,
  S as vesic
};
