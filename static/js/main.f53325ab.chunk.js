(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(2),r=a.n(n),i=a(10),s=a.n(i),c=(a(15),a(0)),o=a(5),l=(a(16),[{name:"Carrier",length:5},{name:"Battleship",length:4},{name:"Destroyer",length:3},{name:"Submarine",length:3},{name:"Patrol Boat",length:2}]),u=(a(17),a(1)),h=function(e){var t=e.handleClick,a=e.coordinate,n=e.position,r=e.ships,i=e.hideShips,s=n.shot,c=n.ship,o="square",l="",h=Object(u.jsx)("svg",{height:"40",width:"40",children:Object(u.jsx)("circle",{cx:"20",cy:"20",r:"12",stroke:"black","stroke-width":"1",fill:"red"})}),p=Object(u.jsx)("svg",{height:"40",width:"40",children:Object(u.jsx)("circle",{cx:"20",cy:"20",r:"12",stroke:"black","stroke-width":"1",fill:"white"})});return o+=s?" no-click":"",c?(o+=i&&!r[c].isSunk?" hidden":" ship",o+=r[c].isSunk?" sunk":"",l=s?h:"",a===r[c].leftEdge?o+=" left-edge":a===r[c].rightEdge&&(o+=" right-edge")):l=s?p:"",Object(u.jsx)("div",{className:o,onClick:function(){return t(a)},children:l})},p=function(e){var t="board";t+=e.clickable?"":" no-click";return Object(u.jsx)("div",{className:t,children:Array(10).fill(null).map((function(t,a){return function(t){var a=10*t,n=Array(10).fill(null).map((function(t,n){var r=a+n;return Object(u.jsx)(h,{coordinate:r,handleClick:e.onClick,clickable:e.clickable,ships:e.ships,position:e.gameboard[r],hideShips:e.hideShips},r)}));return Object(u.jsx)("div",{className:"board-row",children:n},t)}(a)}))})},b=Object(n.memo)(p),d=function(e){var t={name:e};return Object(c.a)(Object(c.a)({data:t},{attack:function(e,t){if(!0!==e.board[t].shot)return e.recieveAttack(t)}}),{computerAttack:function(e){var t=[];for(var a in e.board)e.board[a].shot||t.push(Number(a));var n=t[Math.floor(Math.random()*t.length)];return[function(e,t){if(!0!==e.board[t].shot)return e.recieveAttack(t)}(e,n),n]},randomOpenSpot:function(e){var t=[];for(var a in e)e[a].shot||t.push(Number(a));return t[Math.floor(Math.random()*t.length)]}})},j=a(9),m=a(7),O=function(){var e=function(e,t){var a=e[0],n=e[e.length-1];if(a%10===9||n%10<a%10)return!1;var r=[];t.forEach((function(e,t){e.ship&&(r.push(t,t-10,t+10),t%10!==9&&r.push(t+1,t+11,t-9),t%10!==0&&r.push(t-1,t-11,t+9))}));var i,s=Object(j.a)(e);try{for(s.s();!(i=s.n()).done;){var c=i.value;if(r.includes(c))return!1}}catch(o){s.e(o)}finally{s.f()}return!0};return{placeShip:function(e,t){var a,n=Object(m.a)(t),r=Object(j.a)(e.data.positions);try{for(r.s();!(a=r.n()).done;){var i=a.value;n[i]=Object(c.a)(Object(c.a)({},t[i]),{},{ship:e.data.name})}}catch(s){r.e(s)}finally{r.f()}return n},validPlacement:e,randomCoordinates:function(t,a){for(var n=0,r=function(e){for(var t=Math.floor(98*Math.random()),a=[t],n=1;n<e.length;n++)a.push(t+n);return a},i=r(t);!e(i,a)&&n<11;)i=r(t),n++,console.log("this shouldnt go a lot");return i},isValid:function(e,t,a){return console.log(e[t+a]),!e[t+a].shot}}}(),f=(a(19),function(e){var t=e.header,a=Array.from(t).map((function(e,t){return Object(u.jsx)("span",{children:e},e+t)}));return Object(u.jsx)("div",{className:"header",children:Object(u.jsx)("h1",{children:a})})}),y=(a(20),function(e){var t=e.message;return Object(u.jsx)("div",{className:"messages",children:Object(u.jsx)("p",{children:t})})}),S=a(3),g=function(e){return{isSunk:function(){return e.positions.every((function(t){return e.hits.includes(t)}))},getLength:function(){return e.positions.length},isVertical:function(){return e.isVertical}}},v=function(e,t){var a={name:e,positions:t};return Object(c.a)(Object(c.a)({data:a},function(e){return{hit:function(t){e.hits.push(t),e.isSunk=g(e).isSunk()}}}(a)),g(a))},E=function(e,t){switch(t.id){case"PLACE_SHIP":var a=t.name,n=t.coordinates,r=v(a,n),i=Object(c.a)(Object(c.a)({},e.players[t.player].ships),{},Object(S.a)({},r.data.name,{name:a,health:n.length,leftEdge:n[0],rightEdge:n[n.length-1]})),s=O.placeShip(r,e.players[t.player].board);return Object(c.a)(Object(c.a)({},e),{},{players:Object(c.a)(Object(c.a)({},e.players),{},Object(S.a)({},t.player,Object(c.a)(Object(c.a)({},e.players[t.player]),{},{board:s,ships:i})))});case"ATTACK_SQUARE":var o=t.opponent,l=t.coordinate,u=Object(m.a)(e.players[o].board);return u[l].shot=!0,Object(c.a)(Object(c.a)({},e),{},{players:Object(c.a)(Object(c.a)({},e.players),{},Object(S.a)({},o,Object(c.a)(Object(c.a)({},e.players[o]),{},{board:u})))});case"ATTACK_SHIP":var h=t.opponent,p=t.coordinate,b=e.players[h].board[p].ship,d=e.players[h].ships[b],j=Object(c.a)(Object(c.a)({},e.players[h].ships),{},Object(S.a)({},b,Object(c.a)(Object(c.a)({},d),{},{health:d.health-1})));return 0===j[b].health&&(j[b].isSunk=!0),Object(c.a)(Object(c.a)({},e),{},{players:Object(c.a)(Object(c.a)({},e.players),{},Object(S.a)({},h,Object(c.a)(Object(c.a)({},e.players[h]),{},{ships:j})))});case"SEND_MESSAGE":return Object(c.a)(Object(c.a)({},e),{},{message:t.message});case"SUNK_MESSAGE_SENT":var f=t.player,y=t.shipKey,g=e.players[f].ships[y],E=Object(c.a)(Object(c.a)({},e.players[f].ships),{},Object(S.a)({},y,Object(c.a)(Object(c.a)({},g),{},{messageSent:!0})));return Object(c.a)(Object(c.a)({},e),{},{players:Object(c.a)(Object(c.a)({},e.players),{},Object(S.a)({},f,Object(c.a)(Object(c.a)({},e.players[f]),{},{ships:E})))});case"UPDATE_REMAINING_SHIPS":var k=t.player,N=t.value;return Object(c.a)(Object(c.a)({},e),{},{players:Object(c.a)(Object(c.a)({},e.players),{},Object(S.a)({},k,Object(c.a)(Object(c.a)({},e.players[k]),{},{remainingShips:e.players[k].remainingShips+N})))});case"UPDATE_WINNER":return Object(c.a)(Object(c.a)({},e),{},{winner:t.winner});case"GAME_START":return Object(c.a)(Object(c.a)({},e),{},{started:t.started});case"RESET":return A();default:console.log("BAD ACTION ID"),console.error("BAD ACTION ID")}},A=function(){return{players:{computer:{name:"HAL900",board:Array(100).fill(null).map((function(e,t){return{shot:!1,ship:!1}})),ships:{},remainingShips:0},human:{name:"Player",board:Array(100).fill(null).map((function(e,t){return{shot:!1,ship:!1}})),ships:{},remainingShips:0}},message:"Click on the board to place your ships",winner:"",started:!1}},k=function(){var e=Object(n.useState)(0),t=Object(o.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)(!0),s=Object(o.a)(i,2),h=s[0],p=s[1],j=Object(n.useState)(l),m=Object(o.a)(j,2),f=m[0],S=m[1],g=Object(n.useState)({hit:!1,positions:[],direction:-1}),v=Object(o.a)(g,2),k=v[0],N=v[1],_=Object(n.useReducer)(E,A(),A),T=Object(o.a)(_,2),x=T[0],I=T[1],P=function(e,t){var a="computer"===e?"Sank enemy ".concat(t):"They sank my ".concat(t);I({id:"UPDATE_REMAINING_SHIPS",player:e,value:-1}),I({id:"SEND_MESSAGE",message:a}),I({id:"SUNK_MESSAGE_SENT",player:e,shipKey:t})},C=function(e,t){var a="computer"===e?"Hit Enemy Ship!":"Enemy hit my Ship!";if(I({id:"ATTACK_SQUARE",coordinate:t,opponent:e}),x.players[e].board[t].ship){if("human"===e){var n=k.positions;k.direction,n.unshift(t),N(Object(c.a)(Object(c.a)({},k),{},{hit:!0,positions:n}))}I({id:"SEND_MESSAGE",message:a}),I({id:"ATTACK_SHIP",coordinate:t,opponent:e})}else I({id:"SEND_MESSAGE",message:"Miss!"}),"human"===e&&N(Object(c.a)(Object(c.a)({},k),{},{hit:!1}))};return Object(n.useEffect)((function(){if(!x.started&&0!==f.length){var e=f[0],t=O.randomCoordinates(e,x.players.computer.board);I({id:"PLACE_SHIP",player:"computer",name:e.name,coordinates:t}),I({id:"UPDATE_REMAINING_SHIPS",player:"computer",value:1})}}),[f]),Object(n.useEffect)((function(){for(var e in x.players.computer.ships){var t=x.players.computer.ships[e];t.isSunk&&!t.messageSent&&P("computer",e)}}),[x.players.computer.ships]),Object(n.useEffect)((function(){for(var e in x.players.human.ships){var t=x.players.human.ships[e];t.isSunk&&!t.messageSent&&(P("human",e),N({hit:!1,positions:[],direction:-1,sunk:null}))}}),[x.players.human.ships]),Object(n.useEffect)((function(){if(x.started&&!x.winner)if(k.hit&&k.positions[0]%10!==0&&O.isValid(x.players.human.board,k.positions[0],k.direction)){var e=k.positions[0];e+=k.direction,console.log("last attempt hit, trying ".concat(e)),C("human",e)}else if(k.positions.length>0){var t=k.positions[k.positions.length-1];t+=1,console.log("last attemp missed, trying the other way... ".concat(t)),C("human",t),N((function(e){return Object(c.a)(Object(c.a)({},e),{},{direction:1})}))}else{var a=d().randomOpenSpot(x.players.human.board);C("human",a)}}),[a]),Object(n.useEffect)((function(){if(!(a<1||x.winner)){var e=x.players.computer.remainingShips,t=x.players.human.remainingShips;if(0===e||0===t){var n=e?"computer":"human";I({id:"UPDATE_WINNER",winner:n}),I({id:"SEND_MESSAGE",message:"".concat(n," wins!")})}}}),[x.players.computer.remainingShips,x.players.human.remainingShips]),Object(u.jsxs)("div",{className:"game",children:[Object(u.jsx)(y,{message:x.message}),Object(u.jsxs)("div",{className:"gameboard",children:[Object(u.jsx)(b,{gameboard:x.players.human.board,ships:x.players.human.ships,clickable:!x.started,onClick:function(e){if(!x.started){for(var t=f.slice(1,f.length),a=f[0],n=[e],r=1;r<a.length;r++)n.push(e+r);O.validPlacement(n,x.players.human.board)&&(S(t),I({id:"PLACE_SHIP",player:"human",name:a.name,coordinates:n}),I({id:"UPDATE_REMAINING_SHIPS",player:"human",value:1}),0===t.length&&(I({id:"GAME_START",started:!0}),I({id:"SEND_MESSAGE",message:"Game Start!"})))}}}),x.started&&Object(u.jsx)(b,{gameboard:x.players.computer.board,onClick:function(e){x.winner||x.players.computer.board[e].shot||(C("computer",e),p(!1),setTimeout((function(){p(!0),r((function(e){return e+1}))}),1e3))},ships:x.players.computer.ships,clickable:x.started&&h,hideShips:!0})]}),x.winner&&Object(u.jsx)("button",{onClick:function(){r(0),p(!0),S(l),N({hit:!1,positions:[],direction:-1}),I({id:"RESET"})},children:"Replay?"})]})},N=function(){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(f,{header:"Battleship!"}),Object(u.jsx)(k,{})]})},_=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,22)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),i(e),s(e)}))};s.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(N,{})}),document.getElementById("root")),_()}],[[21,1,2]]]);
//# sourceMappingURL=main.f53325ab.chunk.js.map