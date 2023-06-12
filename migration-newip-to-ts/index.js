(()=>{"use strict";var e={669:(e,n,t)=>{t.d(n,{Z:()=>i});var o=t(645),r=t.n(o)()((function(e){return e[1]}));r.push([e.id,".news__item {\n  display: flex;\n  flex-direction: column;\n  margin: 1rem auto;\n  margin-bottom: 1.6%;\n  background: #fff;\n  color: #333;\n  line-height: 1.4;\n  font-family: Arial, sans-serif;\n  border-radius: 5px;\n  overflow: hidden;\n}\n\n.news__item:hover .news__meta-photo {\n  transform: scale(1.3) rotate(3deg);\n}\n\n.news__item .news__meta {\n  position: relative;\n  height: 200px;\n}\n\n.news__item .news__meta-photo {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-size: cover;\n  background-position: center;\n  transition: transform 0.2s;\n}\n\n.news__item .news__meta-details,\n.news__item .news__meta-details ul {\n  margin: auto;\n  padding: 0;\n  list-style: none;\n}\n\n.news__item .news__meta-details {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: -120%;\n  margin: auto;\n  transition: left 0.2s;\n  background: rgba(0, 0, 0, 0.6);\n  color: #fff;\n  padding: 10px;\n  width: 100%;\n  font-size: 0.9rem;\n}\n\n.news__item .news__description {\n  padding: 1rem;\n  background: #fff;\n  position: relative;\n  z-index: 1;\n}\n\n.news__item .news__description h2 {\n  line-height: 1;\n  margin: 0;\n  font-size: 1.7rem;\n}\n\n.news__item .news__description h3 {\n  font-size: 1rem;\n  font-weight: 300;\n  text-transform: uppercase;\n  color: #a2a2a2;\n  margin-top: 5px;\n}\n\n.news__item .news__description .news__read-more {\n  text-align: right;\n}\n\n.news__item .news__description .news__read-more a {\n  color: #5ad67d;\n  display: inline-block;\n  position: relative;\n  text-decoration: none;\n  font-weight: 800;\n}\n\n.news__item .news__description .news__read-more a:after {\n  content: '→';\n  margin-left: -10px;\n  opacity: 0;\n  vertical-align: middle;\n  transition: margin 0.3s, opacity 0.3s;\n}\n\n.news__item .news__description .news__read-more a:hover:after {\n  margin-left: 5px;\n  opacity: 1;\n}\n\n.news__item p {\n  margin: 1rem 0 0;\n}\n\n.news__item p:first-of-type {\n  margin-top: 1.25rem;\n  position: relative;\n}\n\n.news__item p:first-of-type:before {\n  content: '';\n  position: absolute;\n  height: 5px;\n  background: #5ad67d;\n  width: 35px;\n  top: -0.75rem;\n  border-radius: 3px;\n}\n\n.news__item:hover .news__meta-details {\n  left: 0%;\n}\n\n@media (min-width: 640px) {\n  .news__item {\n    flex-direction: row;\n    max-width: 700px;\n  }\n\n  .news__item .news__meta {\n    flex-basis: 40%;\n    height: auto;\n  }\n\n  .news__item .news__description {\n    flex-basis: 60%;\n  }\n\n  .news__item .news__description:before {\n    -webkit-transform: skewX(-3deg);\n    transform: skewX(-3deg);\n    content: '';\n    background: #fff;\n    width: 30px;\n    position: absolute;\n    left: -10px;\n    top: 0;\n    bottom: 0;\n    z-index: -1;\n  }\n\n  .news__item.alt {\n    flex-direction: row-reverse;\n  }\n\n  .news__item.alt .news__description:before {\n    left: inherit;\n    right: -10px;\n    -webkit-transform: skew(3deg);\n    transform: skew(3deg);\n  }\n\n  .news__item.alt .news__meta-details {\n    padding-left: 25px;\n  }\n}\n",""]);const i=r},501:(e,n,t)=>{t.d(n,{Z:()=>i});var o=t(645),r=t.n(o)()((function(e){return e[1]}));r.push([e.id,".source-wrapper {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n}\n\n.sources {\n  margin: 0 auto;\n  display: flex;\n  justify-content: space-evenly;\n  flex-wrap: wrap;\n  width: 90%;\n  height: 70px;\n  overflow: auto;\n  align-items: center;\n  font: 300 1em 'Fira Sans', sans-serif;\n}\n\n@media (max-width: 640px) {\n  .sources,\n  .sources-lg {\n    flex-direction: column;\n    flex-wrap: nowrap;\n    justify-content: space-between;\n  }\n}\n.sources-lg {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  overflow: auto;\n  height: 70px;\n  align-items: center;\n  overflow-x: hidden;\n}\n\n.source__item {\n  min-width: 260px;\n  padding: 1em 2em;\n}\n.source__item,\n.sources-lg-item {\n  box-sizing: border-box;\n  text-align: center;\n  background: none;\n  border: 2px solid #30c5ff;\n  font: inherit;\n  line-height: 1;\n  margin: 0.5em;\n  color: #70d6ff;\n  transition: 0.25s;\n  cursor: pointer;\n}\n.sources-lg-item {\n  width: 40px;\n  padding: 1rem 8px;\n}\n.source__item:hover,\n.source__item:focus,\n.sources-lg-item:hover,\n.sources-lg-item:focus {\n  border-color: #3fcc59;\n  color: #69db7e;\n  box-shadow: 0 0.5em 0.5em -0.4em #3fcc59;\n  transform: translateY(-0.25em);\n}\n\n.source__item-name {\n  font-weight: 400;\n  white-space: nowrap;\n}\n\n.sources-lg-active {\n  border-color: #3fcc59;\n  color: #69db7e;\n  box-shadow: 0 0.5em 0.5em -0.4em #3fcc59;\n  transform: translateY(-0.25em);\n}\n",""]);const i=r},767:(e,n,t)=>{t.d(n,{Z:()=>i});var o=t(645),r=t.n(o)()((function(e){return e[1]}));r.push([e.id,"body {\n  color: #fff;\n  background: #17181c;\n  font-family: sans-serif;\n}\n\nheader {\n  padding: 10px 30px;\n}\n\nheader h1 {\n  font-size: 40px;\n  font-weight: 800;\n}\nmain {\n  width: 100%;\n}\nfooter {\n  height: 100px;\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  justify-content: center;\n}\nfooter .copyright {\n  font-size: 14px;\n  color: #333;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n}\nfooter .copyright a {\n  color: #444;\n}\nfooter .copyright a:hover {\n  color: #555;\n}\n/* footer .copyright:before {\n  content: '©';\n} */\n.course-link {\n  background-image: url(https://rs.school/images/partners/logo-rs.svg);\n}\n.course-link,\n.github-link {\n  display: block;\n  background-size: contain;\n  width: 60px;\n  height: 50px;\n  transition: all 0.3s;\n}\n.course-link:hover,\n.github-link:hover {\n  transform: scale(1.05);\n}\n.github-link {\n  background-image: url(https://static-00.iconduck.com/assets.00/github-icon-512x499-ziwq0a1i.png);\n  width: 50px;\n}\n",""]);const i=r},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=e(n);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,o){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(o)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(r[s]=!0)}for(var a=0;a<e.length;a++){var c=[].concat(e[a]);o&&r[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),n.push(c))}},n}},242:(e,n,t)=>{t.r(n),t.d(n,{default:()=>s});var o=t(379),r=t.n(o),i=t(669);r()(i.Z,{insert:"head",singleton:!1});const s=i.Z.locals||{}},595:(e,n,t)=>{t.r(n),t.d(n,{default:()=>s});var o=t(379),r=t.n(o),i=t(501);r()(i.Z,{insert:"head",singleton:!1});const s=i.Z.locals||{}},427:(e,n,t)=>{t.r(n),t.d(n,{default:()=>s});var o=t(379),r=t.n(o),i=t(767);r()(i.Z,{insert:"head",singleton:!1});const s=i.Z.locals||{}},379:(e,n,t)=>{var o,r=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),i=[];function s(e){for(var n=-1,t=0;t<i.length;t++)if(i[t].identifier===e){n=t;break}return n}function a(e,n){for(var t={},o=[],r=0;r<e.length;r++){var a=e[r],c=n.base?a[0]+n.base:a[0],l=t[c]||0,u="".concat(c," ").concat(l);t[c]=l+1;var d=s(u),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==d?(i[d].references++,i[d].updater(f)):i.push({identifier:u,updater:h(f,n),references:1}),o.push(u)}return o}function c(e){var n=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var i=t.nc;i&&(o.nonce=i)}if(Object.keys(o).forEach((function(e){n.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(n);else{var s=r(e.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}return n}var l,u=(l=[],function(e,n){return l[e]=n,l.filter(Boolean).join("\n")});function d(e,n,t,o){var r=t?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=u(n,r);else{var i=document.createTextNode(r),s=e.childNodes;s[n]&&e.removeChild(s[n]),s.length?e.insertBefore(i,s[n]):e.appendChild(i)}}function f(e,n,t){var o=t.css,r=t.media,i=t.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var p=null,m=0;function h(e,n){var t,o,r;if(n.singleton){var i=m++;t=p||(p=c(n)),o=d.bind(null,t,i,!1),r=d.bind(null,t,i,!0)}else t=c(n),o=f.bind(null,t,n),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return o(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;o(e=n)}else r()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o));var t=a(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<t.length;o++){var r=s(t[o]);i[r].references--}for(var c=a(e,n),l=0;l<t.length;l++){var u=s(t[l]);0===i[u].references&&(i[u].updater(),i.splice(u,1))}t=c}}}},717:function(e,n,t){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const r=o(t(842)),i=t(527);n.default=class{constructor(){this.controller=new r.default,this.view=new i.AppView}start(){const e=document.querySelector(".sources");e&&(e.addEventListener("click",(e=>this.controller.getNews(e,(e=>this.view.drawNews(e))))),this.controller.getSources((e=>this.view.drawSources(e))))}}},285:(e,n)=>{var t;Object.defineProperty(n,"__esModule",{value:!0}),n.ErrosType=void 0,function(e){e[e.notFound=404]="notFound",e[e.unauthorized=401]="unauthorized"}(t||(n.ErrosType=t={}))},853:function(e,n,t){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const r=o(t(24));class i extends r.default{constructor(){super("https://rss-news-api.onrender.com/",{apiKey:"35c9f99c8367463e87a3c21225c94af8"})}}n.default=i},842:function(e,n,t){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const r=o(t(853));class i extends r.default{getSources(e){super.getResp({endpoint:"sources"},e)}getNews(e,n){let t=e.target;if(t&&t instanceof HTMLElement){const o=e.currentTarget;for(;t&&t!==o;){if(t.classList.contains("source__item")){const e=t.getAttribute("data-source-id");if((null==o?void 0:o.getAttribute("data-source"))!==e){if(!e)throw new Error("source id is not defined");null==o||o.setAttribute("data-source",e),super.getResp({endpoint:"everything",options:{sources:e}},n)}return}t&&(t=t.parentNode)}}}}n.default=i},24:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0});const o=t(285);n.default=class{constructor(e,n){this.baseLink=e,this.options=n}getResp(e,n=(()=>{console.error("No callback for GET response")})){this.load("GET",n,e)}errorHandler(e){if(!e.ok)throw e.status!==o.ErrosType.unauthorized&&e.status!==o.ErrosType.notFound||console.log(`Sorry, but there is ${e.status} error: ${e.statusText}`),Error(e.statusText);return e}makeUrl({endpoint:e,options:n={}}){const t=Object.assign(Object.assign({},this.options),n);let o=`${this.baseLink}${e}?`;return Object.keys(t).forEach((e=>{o+=`${e}=${t[e]}&`})),o.slice(0,-1)}load(e,n,t){fetch(this.makeUrl(t),{method:e}).then(this.errorHandler).then((e=>e.json())).then((e=>n(e))).catch((e=>console.error(e)))}}},527:function(e,n,t){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.AppView=void 0;const r=o(t(798)),i=o(t(53));class s{constructor(){this.news=new r.default,this.sources=new i.default}drawNews(e){const n=(null==e?void 0:e.articles)?null==e?void 0:e.articles:[];this.news.draw(n)}drawSources(e){const n=(null==e?void 0:e.sources)?null==e?void 0:e.sources:[];this.sources.draw(n)}}n.AppView=s,n.default=s},798:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),t(242),n.default=class{draw(e){const n=e.length>=10?e.filter(((e,n)=>n<10)):e,t=document.createDocumentFragment(),o=document.querySelector("#newsItemTemp"),r=document.querySelector(".news");n.forEach(((e,n)=>{const r=null==o?void 0:o.content.cloneNode(!0);if(r){const t=r.querySelector(".news__item"),o=r.querySelector(".news__meta-photo"),i=r.querySelector(".news__meta-author"),s=r.querySelector(".news__description-title"),a=r.querySelector(".news__description-title"),c=r.querySelector(".news__description-source"),l=r.querySelector(".news__description-content"),u=r.querySelector(".news__read-more a");t&&n%2&&t.classList.add("alt"),o&&(o.style.backgroundImage=`url(${e.urlToImage||"https://ajr.org/wp-content/themes/AJR-theme/images/news-placeholder.jpg"})`),i&&(i.textContent=e.author||e.source.name),s&&(s.textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-")),a&&(a.textContent=e.title),c&&(c.textContent=e.source.name),l&&(l.textContent=e.description),u&&u.setAttribute("href",e.url)}t.append(r)})),r&&(r.innerHTML="",r.appendChild(t))}}},53:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),t(595),n.default=class{constructor(){this.draw=e=>{const n=document.createDocumentFragment(),t=document.createDocumentFragment(),o=document.querySelector("#sourceItemTemp"),r=document.querySelector(".sources"),i=document.querySelector("#sourceLgTemp"),s=document.querySelector(".sources-lg"),a=e.map((e=>e.language)).filter(((e,n,t)=>t.indexOf(e)===n));let c="en",l=e;function u(e){e.forEach((e=>{const t=null==o?void 0:o.content.cloneNode(!0);if(t){const n=t.querySelector(".source__item-name"),o=t.querySelector(".source__item");n&&(n.textContent=e.name),o&&o.setAttribute("data-source-id",e.id)}n.append(t)})),r&&(r.innerHTML=""),null==r||r.append(n)}u(l),a.forEach((n=>{const o=null==i?void 0:i.content.cloneNode(!0);if(o){const t=o.querySelector(".sources-lg-name"),r=o.querySelector(".sources-lg-item");t&&(t.textContent=n),r&&r.setAttribute("data-source-lg",n),null==r||r.addEventListener("click",(()=>{[...document.querySelectorAll(".sources-lg-item")].forEach((e=>{e.classList.contains("sources-lg-active")&&e.classList.remove("sources-lg-active")})),r.classList.toggle("sources-lg-active"),c=r.classList.contains("sources-lg-active")?r.getAttribute("data-source-lg"):"",l=e.filter((e=>e.language===c)).length>0?e.filter((e=>e.language===c)):e,u(l)}))}t.append(o)})),null==s||s.append(t)}}}},607:function(e,n,t){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const r=o(t(717));t(427),(new r.default).start()}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={id:o,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(607)})();