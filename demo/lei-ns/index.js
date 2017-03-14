"use strict";

const createNamespace = require('lei-ns').create;

const ns = createNamespace({a: {b: 123}});

ns.merge({a: {c: 456}, d: 789});

ns.set('a.d' ,321);

ns.set('e.f.g.h.i', true);

console.log(ns.has('a'));
// console.log(ns.has('a.a'));
// console.log(ns.all());

ns.delete('a.b');
console.log(ns.get("e.f.g"))
