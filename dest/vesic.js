import"fs";import"path";function r(){return()=>{}}function t(){return r=>r}function n(){}function c(e){if(Array.isArray(e))return function(r){let t=[];return r.forEach((r=>{t.push(c(r))})),t}(e);let i=(e=function(c={}){function e(e=r,i=t,o=n,u={}){c.src=e,c.proc=i,c.sink=o,c.meta=u}return e(c.src,c.proc,c.sink,c.meta),c}(e)).src(),o=e.proc(i,e.meta)(i,e.meta);return e.sink(o,e.meta)}export{t as dummyProc,n as dummySink,r as dummySrc,c as vesic};
