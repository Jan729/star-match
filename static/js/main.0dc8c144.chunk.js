(this["webpackJsonpstar-match"]=this["webpackJsonpstar-match"]||[]).push([[0],{10:function(e,t,a){},4:function(e,t,a){e.exports=a(5)},5:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(0),c=a.n(r),u=a(3),s=a.n(u),i=(a(10),function(e){return c.a.createElement(c.a.Fragment,null,g.range(1,e.count).map((function(e){return c.a.createElement("div",{key:e,className:"star"})})))}),o=function(e){return c.a.createElement("button",{className:"number",style:{backgroundColor:f[e.status]},onClick:function(){return e.onClick(e.number,e.status)}},e.number)},l=function(e){return c.a.createElement("div",{className:"game-done"},c.a.createElement("div",{className:"message",style:{color:"lost"===e.gameStatus?"red":"green"}},"lost"===e.gameStatus?"Game Over":"You Win!"),c.a.createElement("button",{onClick:e.onClick},"Play Again"))},m=function(e){var t=function(){var e=Object(r.useState)(g.random(1,9)),t=Object(n.a)(e,2),a=t[0],c=t[1],u=Object(r.useState)(g.range(1,9)),s=Object(n.a)(u,2),i=s[0],o=s[1],l=Object(r.useState)([]),m=Object(n.a)(l,2),d=m[0],f=m[1],b=Object(r.useState)(10),v=Object(n.a)(b,2),h=v[0],E=v[1];Object(r.useEffect)((function(){if(h>0&&i.length>0){var e=setTimeout((function(){E(h-1)}),1e3);return function(){return clearTimeout(e)}}}));return{stars:a,availableNums:i,candidateNums:d,secondsLeft:h,setGameState:function(e){if(g.sum(e)!==a)f(e);else{var t=i.filter((function(t){return!e.includes(t)}));c(g.randomSumIn(t,9)),o(t),f([])}}}}(),a=t.stars,u=t.availableNums,s=t.candidateNums,m=t.secondsLeft,d=t.setGameState,f=g.sum(s)>a,b=0===u.length?"won":0===m?"lost":"active",v=function(e){return u.includes(e)?s.includes(e)?f?"wrong":"candidate":"available":"used"},h=function(e,t){if("active"===b&&"used"!==t){var a="available"===t?s.concat(e):s.filter((function(t){return t!==e}));d(a)}};return c.a.createElement("div",{className:"game"},c.a.createElement("div",{className:"help"},"Pick 1 or more digits that sum to the number of stars. You can only use each digit once. Use up all of the digits to win!"),c.a.createElement("div",{className:"body"},c.a.createElement("div",{className:"left"},"active"!==b?c.a.createElement(l,{onClick:e.startNewGame,gameStatus:b}):c.a.createElement(i,{count:a})),c.a.createElement("div",{className:"right"},g.range(1,9).map((function(e){return c.a.createElement(o,{key:e,status:v(e),number:e,onClick:h})})))),c.a.createElement("div",{className:"timer"},"Time Remaining: ",m))},d=function(){var e=Object(r.useState)(1),t=Object(n.a)(e,2),a=t[0],u=t[1];return c.a.createElement(m,{key:a,startNewGame:function(){return u(a+1)}})},f={available:"lightgray",used:"lightgreen",wrong:"lightcoral",candidate:"deepskyblue"},g={sum:function(e){return e.reduce((function(e,t){return e+t}),0)},range:function(e,t){return Array.from({length:t-e+1},(function(t,a){return e+a}))},random:function(e,t){return e+Math.floor(Math.random()*(t-e+1))},randomSumIn:function(e,t){for(var a=[[]],n=[],r=0;r<e.length;r++)for(var c=0,u=a.length;c<u;c++){var s=a[c].concat(e[r]),i=g.sum(s);i<=t&&(a.push(s),n.push(i))}return n[g.random(0,n.length-1)]}};s.a.render(c.a.createElement(d,null),document.getElementById("root"))}},[[4,1,2]]]);
//# sourceMappingURL=main.0dc8c144.chunk.js.map