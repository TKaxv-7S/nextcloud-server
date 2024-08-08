/*! For license information please see systemtags-init.js.LICENSE.txt */
(()=>{var t,e={49611:(t,e,n)=>{"use strict";var s=n(31346),i=n(53334),r=n(85072),o=n.n(r),a=n(97825),l=n.n(a),d=n(77659),c=n.n(d),A=n(55056),g=n.n(A),u=n(10540),p=n.n(u),m=n(41113),f=n.n(m),h=n(73911),v={};v.styleTagTransform=f(),v.setAttributes=g(),v.insert=c().bind(null,"head"),v.domAPI=l(),v.insertStyleElement=p(),o()(h.A,v),h.A&&h.A.locals&&h.A.locals;const y=function(t){var e;const n=null===(e=t.attributes)||void 0===e||null===(e=e["system-tags"])||void 0===e?void 0:e["system-tag"];return void 0===n?[]:[n].flat()},C=function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=document.createElement("li");return n.classList.add("files-list__system-tag"),n.textContent=t,e&&n.classList.add("files-list__system-tag--more"),n},b=new s.hY({id:"system-tags",displayName:()=>"",iconSvgInline:()=>"",enabled(t){if(1!==t.length)return!1;const e=t[0];return 0!==y(e).length},exec:async()=>null,async renderInline(t){const e=y(t);if(0===e.length)return null;const n=document.createElement("ul");if(n.classList.add("files-list__system-tags"),1===e.length)n.setAttribute("aria-label",(0,i.Tl)("files","This file has the tag {tag}",{tag:e[0]}));else{const t=e.slice(0,-1).join(", "),s=e[e.length-1];n.setAttribute("aria-label",(0,i.Tl)("files","This file has the tags {firstTags} and {lastTag}",{firstTags:t,lastTag:s}))}if(n.append(C(e[0])),e.length>1){const t=C("+"+(e.length-1),!0);t.setAttribute("title",e.slice(1).join(", ")),n.append(t)}return n},order:0});(0,s.Yc)("nc:system-tags"),(0,s.Gg)(b);var w=n(21777),x=(n(26287),n(63623));const T=(0,n(63814).dC)("dav"),_=(0,x.UU)(T),L=t=>{_.setHeaders({"X-Requested-With":"XMLHttpRequest",requesttoken:null!=t?t:""})};(0,w.zo)(L),L((0,w.do)());var B=n(71654);const O=(0,n(35947).YK)().setApp("systemtags").detectUser().build(),P="/systemtags",S=(0,s.H4)(),j=t=>(0,s.Al)(t),E=t=>'<?xml version="1.0"?>\n<oc:filter-files '.concat((0,s.CP)(),">\n\t<d:prop>\n\t\t").concat((0,s.VX)(),"\n\t</d:prop>\n\t<oc:filter-rules>\n\t\t<oc:systemtag>").concat(t,"</oc:systemtag>\n\t</oc:filter-rules>\n</oc:filter-files>"),I=function(t){var e,n;return new s.vd({id:t.id,source:"".concat(s.PY).concat(P,"/").concat(t.id),owner:String(null!==(e=null===(n=(0,w.HW)())||void 0===n?void 0:n.uid)&&void 0!==e?e:"anonymous"),root:P,displayname:t.displayName,permissions:s.aX.READ,attributes:{...t,"is-tag":!0}})};(0,s.bh)().register(new s.Ss({id:"tags",name:(0,i.Tl)("systemtags","Tags"),caption:(0,i.Tl)("systemtags","List of tags and their associated files and folders."),emptyTitle:(0,i.Tl)("systemtags","No tags found"),emptyCaption:(0,i.Tl)("systemtags","Tags you have created will show up here."),icon:'<svg xmlns="http://www.w3.org/2000/svg" id="mdi-tag-multiple" viewBox="0 0 24 24"><path d="M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.58,19.41L2.59,12.42C2.22,12.05 2,11.55 2,11V6C2,4.89 2.89,4 4,4H9C9.55,4 10.05,4.22 10.41,4.58L17.41,11.58M13.54,5.71L14.54,4.71L21.41,11.58C21.78,11.94 22,12.45 22,13C22,13.55 21.78,14.05 21.42,14.41L16.04,19.79L15.04,18.79L20.75,13L13.54,5.71Z" /></svg>',order:25,getContents:async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";const e=(await(async()=>{try{const{data:t}=await _.getDirectoryContents("/systemtags",{data:'<?xml version="1.0"?>\n<d:propfind  xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns">\n\t<d:prop>\n\t\t<oc:id />\n\t\t<oc:display-name />\n\t\t<oc:user-visible />\n\t\t<oc:user-assignable />\n\t\t<oc:can-assign />\n\t</d:prop>\n</d:propfind>',details:!0,glob:"/systemtags/*"});return(t=>t.map((t=>{let{props:e}=t;return Object.fromEntries(Object.entries(e).map((t=>{let[e,n]=t;return[(0,B.A)(e),"displayName"===(0,B.A)(e)?String(n):n]})))})))(t)}catch(t){throw O.error((0,i.Tl)("systemtags","Failed to load tags"),{error:t}),new Error((0,i.Tl)("systemtags","Failed to load tags"))}})()).filter((t=>t.userVisible));var n;if("/"===t)return{folder:new s.vd({id:0,source:"".concat(s.PY).concat(P),owner:null===(n=(0,w.HW)())||void 0===n?void 0:n.uid,root:P,permissions:s.aX.NONE}),contents:e.map(I)};const r=parseInt(t.split("/",2)[1]),o=e.find((t=>t.id===r));if(!o)throw new Error("Tag not found");return{folder:I(o),contents:(await S.getDirectoryContents(s.lJ,{details:!0,data:E(r),headers:{method:"REPORT"}})).data.map(j)}}}))},73911:(t,e,n)=>{"use strict";n.d(e,{A:()=>a});var s=n(71354),i=n.n(s),r=n(76314),o=n.n(r)()(i());o.push([t.id,".files-list__system-tags{--min-size: 32px;display:none;justify-content:center;align-items:center;min-width:calc(var(--min-size)*2);max-width:300px}.files-list__system-tag{padding:5px 10px;border:1px solid;border-radius:var(--border-radius-pill);border-color:var(--color-border);color:var(--color-text-maxcontrast);height:var(--min-size);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:22px;text-align:center}.files-list__system-tag--more{overflow:visible;text-overflow:initial}.files-list__system-tag+.files-list__system-tag{margin-left:5px}@media(min-width: 512px){.files-list__system-tags{display:flex}}","",{version:3,sources:["webpack://./apps/systemtags/src/css/fileEntryInlineSystemTags.scss"],names:[],mappings:"AAsBA,yBACC,gBAAA,CACA,YAAA,CACA,sBAAA,CACA,kBAAA,CACA,iCAAA,CACA,eAAA,CAGD,wBACC,gBAAA,CACA,gBAAA,CACA,uCAAA,CACA,gCAAA,CACA,mCAAA,CACA,sBAAA,CACA,kBAAA,CACA,eAAA,CACA,sBAAA,CACA,gBAAA,CACA,iBAAA,CAEA,8BACC,gBAAA,CACA,qBAAA,CAID,gDACC,eAAA,CAIF,yBACC,yBACC,YAAA,CAAA",sourcesContent:["/**\n * @copyright Copyright (c) 2023 Lucas Azevedo <lhs_azevedo@hotmail.com>\n *\n * @author Lucas Azevedo <lhs_azevedo@hotmail.com>\n *\n * @license AGPL-3.0-or-later\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\n.files-list__system-tags {\n\t--min-size: 32px;\n\tdisplay: none;\n\tjustify-content: center;\n\talign-items: center;\n\tmin-width: calc(var(--min-size) * 2);\n\tmax-width: 300px;\n}\n\n.files-list__system-tag {\n\tpadding: 5px 10px;\n\tborder: 1px solid;\n\tborder-radius: var(--border-radius-pill);\n\tborder-color: var(--color-border);\n\tcolor: var(--color-text-maxcontrast);\n\theight: var(--min-size);\n\twhite-space: nowrap;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tline-height: 22px; // min-size - 2 * 5px padding\n\ttext-align: center;\n\n\t&--more {\n\t\toverflow: visible;\n\t\ttext-overflow: initial;\n\t}\n\n\t// Proper spacing if multiple shown\n\t& + .files-list__system-tag {\n\t\tmargin-left: 5px;\n\t}\n}\n\n@media (min-width: 512px) {\n\t.files-list__system-tags {\n\t\tdisplay: flex;\n\t}\n}\n"],sourceRoot:""}]);const a=o},42634:()=>{},15340:()=>{},79838:()=>{}},n={};function s(t){var i=n[t];if(void 0!==i)return i.exports;var r=n[t]={id:t,loaded:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.loaded=!0,r.exports}s.m=e,t=[],s.O=(e,n,i,r)=>{if(!n){var o=1/0;for(c=0;c<t.length;c++){n=t[c][0],i=t[c][1],r=t[c][2];for(var a=!0,l=0;l<n.length;l++)(!1&r||o>=r)&&Object.keys(s.O).every((t=>s.O[t](n[l])))?n.splice(l--,1):(a=!1,r<o&&(o=r));if(a){t.splice(c--,1);var d=i();void 0!==d&&(e=d)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[n,i,r]},s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},s.e=()=>Promise.resolve(),s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),s.j=2766,(()=>{s.b=document.baseURI||self.location.href;var t={2766:0};s.O.j=e=>0===t[e];var e=(e,n)=>{var i,r,o=n[0],a=n[1],l=n[2],d=0;if(o.some((e=>0!==t[e]))){for(i in a)s.o(a,i)&&(s.m[i]=a[i]);if(l)var c=l(s)}for(e&&e(n);d<o.length;d++)r=o[d],s.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return s.O(c)},n=self.webpackChunknextcloud=self.webpackChunknextcloud||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})(),s.nc=void 0;var i=s.O(void 0,[4208],(()=>s(49611)));i=s.O(i)})();
//# sourceMappingURL=systemtags-init.js.map?v=d1d45ddba3b6aae190e2