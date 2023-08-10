/*! For license information please see files_reminders-main.js.LICENSE.txt */
(()=>{var e,t={8251:(e,t,s)=>{"use strict";var r=s(20144),n=s(78595),a=s(64024),i=s(31352),o=s(45400),l=s.n(o),d=s(79570),c=s.n(d),u=s(12945),m=s.n(u),f=s(875),j=s.n(f),p=s(32219),h=s(32291),y=s(80419),b=s(71107),k=s(4820),v=s(79753);const g=async(e,t)=>{const s=(0,v.generateOcsUrl)("/apps/files_reminders/api/v1/set/{fileId}",{fileId:e});return(await k.default.put(s,{dueDate:t.toISOString()})).data.ocs.data};var _,w=s(80351),A=s.n(w);!function(e){e[e.LaterToday=0]="LaterToday",e[e.Tomorrow=1]="Tomorrow",e[e.ThisWeekend=2]="ThisWeekend",e[e.NextWeek=3]="NextWeek"}(_||(_={}));const x=()=>{const e=A()().get("hour");return A()().startOf("day").add(e+2,"hour").toDate()},D=e=>{let t={hour:"numeric",minute:"2-digit"};const s=A()(e),r=A()();return s.isSame(r,"date")||(t={...t,weekday:"short"}),s.isSame(r,"week")||(t={...t,month:"short",day:"numeric"}),e.toLocaleString((0,i.aj)(),t)},I=e=>e.toLocaleString((0,i.aj)(),{weekday:"long",hour:"numeric",minute:"2-digit",month:"long",day:"numeric"}),S=(0,s(17499).IY)().setApp("files_reminders").detectUser().build(),O={dateTimePreset:_.LaterToday,label:(0,i.Iu)("files_reminders","Later today"),ariaLabel:(0,i.Iu)("files_reminders","Set reminder for later today")},C={dateTimePreset:_.Tomorrow,label:(0,i.Iu)("files_reminders","Tomorrow"),ariaLabel:(0,i.Iu)("files_reminders","Set reminder for tomorrow")},z={dateTimePreset:_.ThisWeekend,label:(0,i.Iu)("files_reminders","This weekend"),ariaLabel:(0,i.Iu)("files_reminders","Set reminder for this weekend")},N={dateTimePreset:_.NextWeek,label:(0,i.Iu)("files_reminders","Next week"),ariaLabel:(0,i.Iu)("files_reminders","Set reminder for next week")},T=r.default.extend({name:"SetReminderActions",components:{ArrowLeft:p.default,CalendarClock:h.Z,Check:y.default,CloseCircleOutline:b.Z,NcActionButton:l(),NcActionInput:c(),NcActions:m(),NcActionSeparator:j()},props:{file:{type:Object,required:!0},dueDate:{type:Date,default:null}},data:()=>({open:!0,now:new Date,customDueDate:x()}),watch:{open(e){e||this.$emit("close")}},computed:{fileId(){return this.file.id},fileName(){return this.file.name},clearAriaLabel(){return"".concat((0,i.Iu)("files_reminders","Clear reminder")," – ").concat(I(this.dueDate))},customAriaLabel(){return""===this.customDueDate?null:"".concat((0,i.Iu)("files_reminders","Set reminder at custom date & time")," – ").concat(I(this.customDueDate))},options(){return[O,C,z,N].map((e=>{const t=(e=>({[_.LaterToday]:()=>{const e=A()(),t=A()().startOf("day").add(18,"hour"),s=t.clone().subtract(1,"hour");return e.isSameOrAfter(s)?null:t.toDate()},[_.Tomorrow]:()=>A()().add(1,"day").startOf("day").add(8,"hour").toDate(),[_.ThisWeekend]:()=>{const e=A()();return[5,6,7].includes(e.isoWeekday())?null:A()().startOf("isoWeek").add(5,"day").add(8,"hour").toDate()},[_.NextWeek]:()=>7===A()().isoWeekday()?null:A()().startOf("isoWeek").add(1,"week").add(8,"hour").toDate()}[e]()))(e.dateTimePreset);return t?{...e,ariaLabel:"".concat(e.ariaLabel," – ").concat(I(t)),dateString:D(t),action:()=>this.set(t)}:null})).filter(Boolean)}},methods:{t:i.Iu,getDateString:D,async set(e){try{await g(this.fileId,e),(0,a.s$)((0,i.Iu)("files_reminders",'Reminder set for "{fileName}"',{fileName:this.fileName})),this.open=!1}catch(e){S.error("Failed to set reminder",{error:e}),(0,a.x2)((0,i.Iu)("files_reminders","Failed to set reminder"))}},async setCustom(){if(""!==this.customDueDate)try{await g(this.fileId,this.customDueDate),(0,a.s$)((0,i.Iu)("files_reminders",'Reminder set for "{fileName}"',{fileName:this.fileName})),this.open=!1}catch(e){S.error("Failed to set reminder",{error:e}),(0,a.x2)((0,i.Iu)("files_reminders","Failed to set reminder"))}else(0,a.x2)((0,i.Iu)("files_reminders","Please choose a valid date & time"))},async clear(){try{await(async e=>{const t=(0,v.generateOcsUrl)("/apps/files_reminders/api/v1/remove/{fileId}",{fileId:e});return(await k.default.delete(t)).data.ocs.data})(this.fileId),(0,a.s$)((0,i.Iu)("files_reminders","Reminder cleared")),this.open=!1}catch(e){S.error("Failed to clear reminder",{error:e}),(0,a.x2)((0,i.Iu)("files_reminders","Failed to clear reminder"))}}}});var L=s(93379),B=s.n(L),P=s(7795),W=s.n(P),$=s(90569),F=s.n($),E=s(3565),Z=s.n(E),R=s(19216),U=s.n(R),M=s(44589),q=s.n(M),Y=s(66652),G={};G.styleTagTransform=q(),G.setAttributes=Z(),G.insert=F().bind(null,"head"),G.domAPI=W(),G.insertStyleElement=U(),B()(Y.Z,G),Y.Z&&Y.Z.locals&&Y.Z.locals;const H=(0,s(51900).Z)(T,(function(){var e=this,t=e._self._c;return e._self._setupProxy,t("NcActions",{staticClass:"actions-secondary-vue",attrs:{open:e.open},on:{"update:open":function(t){e.open=t}}},[t("NcActionButton",{on:{click:function(t){return e.$emit("back")}},scopedSlots:e._u([{key:"icon",fn:function(){return[t("ArrowLeft",{attrs:{size:20}})]},proxy:!0}])},[e._v("\n\t\t"+e._s(e.t("files_reminders","Back"))+"\n\t")]),e._v(" "),Boolean(e.dueDate)?t("NcActionButton",{attrs:{"aria-label":e.clearAriaLabel},on:{click:e.clear},scopedSlots:e._u([{key:"icon",fn:function(){return[t("CloseCircleOutline",{attrs:{size:20}})]},proxy:!0}],null,!1,3165582732)},[e._v("\n\t\t"+e._s(e.t("files_reminders","Clear reminder"))+" – "+e._s(e.getDateString(e.dueDate))+"\n\t")]):e._e(),e._v(" "),t("NcActionSeparator"),e._v(" "),e._l(e.options,(function(s){let{label:r,ariaLabel:n,dateString:a,action:i}=s;return t("NcActionButton",{key:r,attrs:{"aria-label":n},on:{click:i}},[e._v("\n\t\t"+e._s(r)+" – "+e._s(a)+"\n\t")])})),e._v(" "),t("NcActionSeparator"),e._v(" "),t("NcActionInput",{attrs:{type:"datetime-local","is-native-picker":"",min:e.now},scopedSlots:e._u([{key:"icon",fn:function(){return[t("CalendarClock",{attrs:{size:20}})]},proxy:!0}]),model:{value:e.customDueDate,callback:function(t){e.customDueDate=t},expression:"customDueDate"}}),e._v(" "),t("NcActionButton",{attrs:{"aria-label":e.customAriaLabel},on:{click:e.setCustom},scopedSlots:e._u([{key:"icon",fn:function(){return[t("Check",{attrs:{size:20}})]},proxy:!0}])},[e._v("\n\t\t"+e._s(e.t("files_reminders","Set custom reminder"))+"\n\t")])],2)}),[],!1,null,"5d769186",null).exports;(0,n.Ld)("files:action-menu:opened",(async e=>{const t=e.context.fileInfoModel.attributes.id,s=e.context.$file[0].querySelector(".fileactions .action-menu"),n=e.el.querySelector(".action-setreminder-container .action-setreminder");let o=null,l=null;try{o=(await(async e=>{const t=(0,v.generateOcsUrl)("/apps/files_reminders/api/v1/get/{fileId}",{fileId:e}),s=await k.default.get(t);return{dueDate:s.data.ocs.data.dueDate?new Date(s.data.ocs.data.dueDate):null}})(t)).dueDate}catch(e){l=e,S.error("Failed to load reminder for file with id: ".concat(t),{error:l})}n.addEventListener("click",(t=>{if(l)throw(0,a.x2)((0,i.Iu)("files_reminders","Failed to load reminder")),Error();const n=document.createElement("div"),d=r.default.extend(H),c=s.style.display;s.style.display="none",s.insertAdjacentElement("afterend",n);const u=new d({propsData:{file:e.context.fileInfoModel.attributes,dueDate:o}}).$mount(n),m=()=>{u.$destroy(),u.$el.remove(),s.style.display=c};u.$once("back",(()=>{m(),s.click()})),u.$once("close",(()=>{m()}))}),{once:!0})}))},66652:(e,t,s)=>{"use strict";s.d(t,{Z:()=>o});var r=s(87537),n=s.n(r),a=s(23645),i=s.n(a)()(n());i.push([e.id,".actions-secondary-vue[data-v-5d769186]{display:block !important;float:right !important;padding:5px 0 0 4px !important;pointer-events:none !important}","",{version:3,sources:["webpack://./apps/files_reminders/src/components/SetReminderActions.vue"],names:[],mappings:"AACA,wCACC,wBAAA,CACA,sBAAA,CACA,8BAAA,CACA,8BAAA",sourcesContent:["\n.actions-secondary-vue {\n\tdisplay: block !important;\n\tfloat: right !important;\n\tpadding: 5px 0 0 4px !important;\n\tpointer-events: none !important; // prevent activation of file row\n}\n"],sourceRoot:""}]);const o=i},46700:(e,t,s)=>{var r={"./af":42786,"./af.js":42786,"./ar":30867,"./ar-dz":14130,"./ar-dz.js":14130,"./ar-kw":96135,"./ar-kw.js":96135,"./ar-ly":56440,"./ar-ly.js":56440,"./ar-ma":47702,"./ar-ma.js":47702,"./ar-sa":16040,"./ar-sa.js":16040,"./ar-tn":37100,"./ar-tn.js":37100,"./ar.js":30867,"./az":31083,"./az.js":31083,"./be":9808,"./be.js":9808,"./bg":68338,"./bg.js":68338,"./bm":67438,"./bm.js":67438,"./bn":8905,"./bn-bd":76225,"./bn-bd.js":76225,"./bn.js":8905,"./bo":11560,"./bo.js":11560,"./br":1278,"./br.js":1278,"./bs":80622,"./bs.js":80622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":50877,"./cv.js":50877,"./cy":47373,"./cy.js":47373,"./da":24780,"./da.js":24780,"./de":59740,"./de-at":60217,"./de-at.js":60217,"./de-ch":60894,"./de-ch.js":60894,"./de.js":59740,"./dv":5300,"./dv.js":5300,"./el":50837,"./el.js":50837,"./en-au":78348,"./en-au.js":78348,"./en-ca":77925,"./en-ca.js":77925,"./en-gb":22243,"./en-gb.js":22243,"./en-ie":46436,"./en-ie.js":46436,"./en-il":47207,"./en-il.js":47207,"./en-in":44175,"./en-in.js":44175,"./en-nz":76319,"./en-nz.js":76319,"./en-sg":31662,"./en-sg.js":31662,"./eo":92915,"./eo.js":92915,"./es":55655,"./es-do":55251,"./es-do.js":55251,"./es-mx":96112,"./es-mx.js":96112,"./es-us":71146,"./es-us.js":71146,"./es.js":55655,"./et":5603,"./et.js":5603,"./eu":77763,"./eu.js":77763,"./fa":76959,"./fa.js":76959,"./fi":11897,"./fi.js":11897,"./fil":42549,"./fil.js":42549,"./fo":94694,"./fo.js":94694,"./fr":94470,"./fr-ca":63049,"./fr-ca.js":63049,"./fr-ch":52330,"./fr-ch.js":52330,"./fr.js":94470,"./fy":5044,"./fy.js":5044,"./ga":29295,"./ga.js":29295,"./gd":2101,"./gd.js":2101,"./gl":38794,"./gl.js":38794,"./gom-deva":27884,"./gom-deva.js":27884,"./gom-latn":23168,"./gom-latn.js":23168,"./gu":95349,"./gu.js":95349,"./he":24206,"./he.js":24206,"./hi":30094,"./hi.js":30094,"./hr":30316,"./hr.js":30316,"./hu":22138,"./hu.js":22138,"./hy-am":11423,"./hy-am.js":11423,"./id":29218,"./id.js":29218,"./is":90135,"./is.js":90135,"./it":90626,"./it-ch":10150,"./it-ch.js":10150,"./it.js":90626,"./ja":39183,"./ja.js":39183,"./jv":24286,"./jv.js":24286,"./ka":12105,"./ka.js":12105,"./kk":47772,"./kk.js":47772,"./km":18758,"./km.js":18758,"./kn":79282,"./kn.js":79282,"./ko":33730,"./ko.js":33730,"./ku":1408,"./ku.js":1408,"./ky":33291,"./ky.js":33291,"./lb":36841,"./lb.js":36841,"./lo":55466,"./lo.js":55466,"./lt":57010,"./lt.js":57010,"./lv":37595,"./lv.js":37595,"./me":39861,"./me.js":39861,"./mi":35493,"./mi.js":35493,"./mk":95966,"./mk.js":95966,"./ml":87341,"./ml.js":87341,"./mn":5115,"./mn.js":5115,"./mr":10370,"./mr.js":10370,"./ms":9847,"./ms-my":41237,"./ms-my.js":41237,"./ms.js":9847,"./mt":72126,"./mt.js":72126,"./my":56165,"./my.js":56165,"./nb":64924,"./nb.js":64924,"./ne":16744,"./ne.js":16744,"./nl":93901,"./nl-be":59814,"./nl-be.js":59814,"./nl.js":93901,"./nn":83877,"./nn.js":83877,"./oc-lnc":92135,"./oc-lnc.js":92135,"./pa-in":15858,"./pa-in.js":15858,"./pl":64495,"./pl.js":64495,"./pt":89520,"./pt-br":57971,"./pt-br.js":57971,"./pt.js":89520,"./ro":96459,"./ro.js":96459,"./ru":21793,"./ru.js":21793,"./sd":40950,"./sd.js":40950,"./se":10490,"./se.js":10490,"./si":90124,"./si.js":90124,"./sk":64249,"./sk.js":64249,"./sl":14985,"./sl.js":14985,"./sq":51104,"./sq.js":51104,"./sr":49131,"./sr-cyrl":79915,"./sr-cyrl.js":79915,"./sr.js":49131,"./ss":85893,"./ss.js":85893,"./sv":98760,"./sv.js":98760,"./sw":91172,"./sw.js":91172,"./ta":27333,"./ta.js":27333,"./te":23110,"./te.js":23110,"./tet":52095,"./tet.js":52095,"./tg":27321,"./tg.js":27321,"./th":9041,"./th.js":9041,"./tk":19005,"./tk.js":19005,"./tl-ph":75768,"./tl-ph.js":75768,"./tlh":89444,"./tlh.js":89444,"./tr":72397,"./tr.js":72397,"./tzl":28254,"./tzl.js":28254,"./tzm":51106,"./tzm-latn":30699,"./tzm-latn.js":30699,"./tzm.js":51106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":67691,"./uk.js":67691,"./ur":13795,"./ur.js":13795,"./uz":6791,"./uz-latn":60588,"./uz-latn.js":60588,"./uz.js":6791,"./vi":65666,"./vi.js":65666,"./x-pseudo":14378,"./x-pseudo.js":14378,"./yo":75805,"./yo.js":75805,"./zh-cn":83839,"./zh-cn.js":83839,"./zh-hk":55726,"./zh-hk.js":55726,"./zh-mo":99807,"./zh-mo.js":99807,"./zh-tw":74152,"./zh-tw.js":74152};function n(e){var t=a(e);return s(t)}function a(e){if(!s.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}n.keys=function(){return Object.keys(r)},n.resolve=a,e.exports=n,n.id=46700}},s={};function r(e){var n=s[e];if(void 0!==n)return n.exports;var a=s[e]={id:e,loaded:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}r.m=t,e=[],r.O=(t,s,n,a)=>{if(!s){var i=1/0;for(c=0;c<e.length;c++){s=e[c][0],n=e[c][1],a=e[c][2];for(var o=!0,l=0;l<s.length;l++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](s[l])))?s.splice(l--,1):(o=!1,a<i&&(i=a));if(o){e.splice(c--,1);var d=n();void 0!==d&&(t=d)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[s,n,a]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),r.j=5265,(()=>{r.b=document.baseURI||self.location.href;var e={5265:0};r.O.j=t=>0===e[t];var t=(t,s)=>{var n,a,i=s[0],o=s[1],l=s[2],d=0;if(i.some((t=>0!==e[t]))){for(n in o)r.o(o,n)&&(r.m[n]=o[n]);if(l)var c=l(r)}for(t&&t(s);d<i.length;d++)a=i[d],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(c)},s=self.webpackChunknextcloud=self.webpackChunknextcloud||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})(),r.nc=void 0;var n=r.O(void 0,[7874],(()=>r(8251)));n=r.O(n)})();
//# sourceMappingURL=files_reminders-main.js.map?v=9a605d4bf675ca580226