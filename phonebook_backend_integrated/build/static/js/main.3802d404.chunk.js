(window["webpackJsonpsecond-section-part2"]=window["webpackJsonpsecond-section-part2"]||[]).push([[0],{15:function(e,t,n){e.exports=n(39)},20:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(13),o=n.n(l),c=(n(20),n(14)),u=n(2),s=function(e){var t=e.value;return r.a.createElement("div",{className:"header-div"},r.a.createElement("h1",{className:"header"},t))},i=function(e){var t=e.addPerson,n=e.handler;return r.a.createElement("div",{className:"form"},r.a.createElement("form",{onSubmit:t},r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"Name:"),r.a.createElement("td",null,r.a.createElement("input",{name:"email",onChange:n}))),r.a.createElement("tr",null,r.a.createElement("td",null,"Number:"),r.a.createElement("td",null,r.a.createElement("input",{name:"num",onChange:n}))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("button",{type:"submit"},"Save")))))))},m=function(e){var t=e.name,n=e.number,a=e.deletePer,l=e.id;return console.log("id",l),console.log("name",t),console.log("number",n),console.log("delete",a),void 0===l?r.a.createElement(r.a.Fragment,null):r.a.createElement(r.a.Fragment,null,r.a.createElement("li",{className:"item"},t," ",n," ",r.a.createElement("button",{onClick:function(){return a(l)}},"delete")))},d=function(e){var t=e.itemArray,n=e.deletePer;console.log(t);var a=[];return t.forEach(function(e){a.push(r.a.createElement(m,{name:e.name,number:e.number,key:e.id,id:e.id,deletePer:n}))}),r.a.createElement("div",{className:"list"},r.a.createElement("ul",null,a))},f=function(e){var t=e.filterHandler;return r.a.createElement("div",{className:"filter"},r.a.createElement("p",null,"Filter with:"),r.a.createElement("input",{name:"filter",placeholder:"Filter",onChange:t}))},g=n(3),E=n.n(g),p="/api/persons",v=function(){return E.a.get(p).then(function(e){return e.data})},b=function(e,t){var n=E.a.put("".concat(p,"/").concat(e),t);return console.log("update",n),n.then(function(e){return console.log("update",e.data),e.data})},h=function(e){var t=E.a.post(p,e);return console.log("create",t),t.then(function(e){return console.log("response data",e.data),e.data})},O=function(e){return E.a.delete("".concat(p,"/").concat(e)).then(function(e){return e.status})},w=function(e){var t=e.error;return null===t?null:t.includes("not")?r.a.createElement("div",{className:"errorMsg"},r.a.createElement("div",{className:"msg-content"},r.a.createElement("p",null,t))):r.a.createElement("div",{className:"SuccessMsg"},r.a.createElement("div",{className:"msg-content"},r.a.createElement("p",null,t)))};n(38);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var y=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],l=t[1],o=Object(a.useState)(""),m=Object(u.a)(o,2),g=m[0],E=m[1],p=Object(a.useState)(""),y=Object(u.a)(p,2),P=y[0],N=y[1],R=Object(a.useState)(n),S=Object(u.a)(R,2),D=S[0],k=S[1],T=Object(a.useState)(null),A=Object(u.a)(T,2),F=A[0],C=A[1];Object(a.useEffect)(function(){console.log("effect"),v().then(function(e){console.log(e),l(e),k(e)})},[]),console.log(n.length);return r.a.createElement("div",{className:"App"},r.a.createElement(s,{value:"Phonebook"}),r.a.createElement(w,{error:F}),r.a.createElement(s,{value:"Filter"}),r.a.createElement(f,{filterHandler:function(e){if("filter"===e.target.name){console.log("Filter value",e.target.value);var t=n.filter(function(t){return t.name.includes(e.target.value)});k(t),console.log(D)}}}),r.a.createElement(s,{value:"Add new Person"}),r.a.createElement(i,{handler:function(e){console.log(e.target.value),console.log(e.target.name);"email"===e.target.name?E(e.target.value):N(e.target.value)},addPerson:function(e){e.preventDefault();var t={name:g,num:P};if(console.log(t),0===n.filter(function(e){return e.name===g}).length){var a={id:n.length+1,name:g,num:P};h(a).then(function(e){l(n.concat(e)),k(n.concat(e)),C("Person added successfully!"),setTimeout(function(){C(null)},3e3)}).catch(function(e){C("Add was not successfull! Error '".concat(e.response.data.error,"'")),console.log("Error",e.response.data.error),setTimeout(function(){C(null)},3e3)})}else{if(window.confirm(g+" is already added to the phonebook.Do you want to update information?")){var r=n.filter(function(e){return e.name===g}),o=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach(function(t){Object(c.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},r[0],{num:P});console.log(o),b(r[0].id,o).then(function(e){console.log("object to be updated",e),console.log("idddddddd",r[0].id),k(n.map(function(t){return t.id===r[0].id?e:t})),console.log("PERRRRRRRRRRRRR",D),C("Update was successfull!"),setTimeout(function(){C(null)},3e3)}).catch(function(e){C("Update was not successfull! Error '".concat(e,"'")),setTimeout(function(){C(null)},3e3)})}}}}),r.a.createElement(s,{value:"Numbers"}),r.a.createElement(d,{itemArray:D,deletePer:function(e){console.log(e),window.confirm("Are you sure?")&&O(e).then(function(e){console.log("Person deleted!",e),console.log(e),200===e&&v().then(function(e){console.log("Entered"),l(e),k(e),C("Deletion was successfull!"),setTimeout(function(){C(null)},2e3)}).catch(function(e){C("Deletion was not succesfull! Error: '".concat(e,"'")),setTimeout(function(){C(null)},3e3)})}).catch(function(e){C("Deletion was not succesfull! Error: '".concat(e,"'")),setTimeout(function(){C(null)},3e3)})}}))};o.a.render(r.a.createElement(y,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.3802d404.chunk.js.map