import r,{mkdirSync as n,writeFileSync as t}from"fs";import{format as e,dirname as u}from"path";function i(){return()=>{}}function o(r){return r}function c(){}function s(r){if(Array.isArray(r))return function(r){return r.map((r=>s(r)))}(r);r=function(r={}){return function(n=i,t=o,e=c,u={}){r.src=n,r.proc=t,r.sink=e,r.meta=u}(r.src,r.proc,r.sink,r.meta),r}(r);let n=r.src(),t=r.proc(n,r.meta);return r.sink(t,r.meta)}function f(r,n){return t=>r(t,n)}function p(...r){return(n,t)=>r.reduce(((r,n)=>n(r,t)),n)}function a(...r){return(n,t)=>r.map((r=>r(n,t)))}function m(r,n,t){return{src(n){return r=n(),this},done:()=>t,meta(r){return n=r,this},proc(t){return r=t(r,n||{}),this},sink(e){return t=e(r,n||{}),this},series(...r){return this.proc(p(...r))},parallel(...r){return this.sink(a(...r))},exec(r,n){return this.meta(n),this.proc(r)}}}function h(r){return"object"==typeof r?e(r):r}function l(n,t="utf-8"){return n=h(n),()=>r.readFileSync(n,t)}function k(r,e){let i=h(e.path);const o=u(i);n(o,{recursive:!0}),t(i,r.toString(),e.options)}function y(r){return()=>r}function d(r){return r}function g(r){console.log(r)}export{o as bypass,c as dummySink,i as dummySrc,l as file,f as meta,k as mkfile,a as parallel,g as print,d as ret,p as series,m as stream,y as val,s as vesic};
