import n,{mkdirSync as t,writeFileSync as r}from"fs";import{join as e,dirname as u}from"path";function o(){return()=>{}}function i(n){return n}function c(){}function a(n){if(Array.isArray(n))return function(n){return n.map((n=>a(n)))}(n);let t=(n=function(n={}){return function(t=o,r=i,e=c,u={}){n.src=t,n.proc=r,n.sink=e,n.meta=u}(n.src,n.proc,n.sink,n.meta),n}(n)).src(),r=n.proc(t,n.meta);return n.sink(r,n.meta)}function f(n,t){return r=>n(r,t)}function m(t,r="utf-8"){return()=>n.readFileSync(t,r)}function p(n){return"object"==typeof n?(n=function(n){function t(t="./dest/",r="index",e=".txt"){n.dirname=t,n.name=r,n.extname=e}return t(n.dirname,n.name,n.extname),n}(meta.path),e(n.dirname,n.name+n.extname)):n}function s(n,e){e=function(n={}){return function(t="./dest/index.txt"){n.path=t}(n.path),n}(e);let o=p(e.path);const i=u(o);t(i,{recursive:!0}),r(o,n,e.options)}function d(n){return()=>n}function x(n){return n}function h(...n){return(t,r)=>n.reduce(((n,t)=>t(n,r)),t)}function l(...n){return(t,r)=>n.map((n=>n(t,r)))}function y(n){console.log(n)}export{i as bypass,c as dummySink,o as dummySrc,m as file,f as meta,s as mkfile,l as parallel,y as print,x as ret,h as series,d as val,a as vesic};
