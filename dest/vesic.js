import t,{mkdirSync as n,writeFileSync as r}from"fs";import{join as e,dirname as o}from"path";function u(){return()=>{}}function a(n,r="utf-8"){return()=>t.readFileSync(n,r)}function c(t){return()=>t}function i(){return t=>t}function f(...t){return(n,r)=>()=>{let e=n;return t.forEach((t=>{let n=t(e,r);e=n(e,r)})),e}}function p(){}function h(t,u){let a=(u=function(t={}){function n(n="./dest/index.txt"){t.path=n}return n(t.path),t}(u)).path;"object"==typeof u.path&&(u=function(t){function n(n="./dest/",r="index",e="txt"){t.path.dirname=n,t.path.name=r,t.path.extname=e}return n(t.path.dirname,t.path.name,t.path.extname),t}(u),a=e(u.path.dirname,u.path.name+u.path.extname));const c=o(a);n(c,{recursive:!0}),r(a,t,u.options)}function m(t){return t}function s(t){console.log(t)}function l(...t){return(n,r)=>{let e=[];return t.forEach((t=>{e.push(t(n,r))})),e}}function d(t){if(Array.isArray(t))return function(t){let n=[];return t.forEach((t=>{n.push(d(t))})),n}(t);t=function(t={}){function n(n=u,r=i,e=p,o={}){t.src=n,t.proc=r,t.sink=e,t.meta=o}return n(t.src,t.proc,t.sink,t.meta),t}(t);let n=t.src(),r=t.proc(n,t.meta)(n,t.meta);return t.sink(r,t.meta)}const x=function(t,n){return()=>r=>t(r,n)};export{i as dummyProc,p as dummySink,u as dummySrc,a as file,x as meta,h as mkfile,l as parallel,s as print,m as ret,f as series,c as val,d as vesic};
