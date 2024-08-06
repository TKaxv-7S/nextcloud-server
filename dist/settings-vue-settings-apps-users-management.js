/*! For license information please see settings-vue-settings-apps-users-management.js.LICENSE.txt */
(()=>{var e,s,r,a={92973:(e,t,s)=>{"use strict";s.d(t,{l:()=>a});var r=s(53334);const a=Object.freeze({installed:(0,r.Tl)("settings","Your apps"),enabled:(0,r.Tl)("settings","Active apps"),disabled:(0,r.Tl)("settings","Disabled apps"),updates:(0,r.Tl)("settings","Updates"),"app-bundles":(0,r.Tl)("settings","App bundles"),featured:(0,r.Tl)("settings","Featured apps"),supported:(0,r.Tl)("settings","Supported apps")})},58692:(e,t,s)=>{"use strict";s.d(t,{A:()=>r});const r=(0,s(53529).YK)().setApp("settings").detectUser().build()},47027:(e,s,r)=>{"use strict";var a=r(85471),o=r(80284),i=r(58723);const d={name:"App",beforeMount(){null!==document.getElementById("serverData")&&this.$store.commit("setServerData",JSON.parse(document.getElementById("serverData").dataset.server))}},c=(0,r(14486).A)(d,(function(){return(0,this._self._c)("router-view")}),[],!1,null,null,null).exports;var u=r(40173),p=r(63814),l=r(92973),m=r(95353),g=r(26287),h=r(39654);r(51257);const f=function(e){return e.replace(/\/$/,"")},A=()=>(0,h.C)(),b=(e,t)=>g.A.get(f(e),t),y=(e,t)=>g.A.post(f(e),t),I=(e,t)=>g.A.put(f(e),t),U=(e,t)=>g.A.delete(f(e),{params:t});var v=r(87485),L=r(58692),w=r(78791),P=r(96763);const C=function(e,t){return 1===t?e.sort(((e,t)=>e.usercount-e.disabled<t.usercount-t.disabled)):e.sort(((e,t)=>e.name.localeCompare(t.name)))},E={id:"",name:"",usercount:0,disabled:0,canAdd:!0,canRemove:!0},_={appendUsers(e,t){const s=e.users.map((e=>{let{id:t}=e;return t})),r=Object.values(t).filter((e=>{let{id:t}=e;return!s.includes(t)})),a=e.users.concat(r);e.usersOffset+=e.usersLimit,e.users=a},updateDisabledUsers(e,t){e.disabledUsersOffset+=e.disabledUsersLimit},setPasswordPolicyMinLength(e,t){e.minPasswordLength=""!==t?t:0},initGroups(e,t){let{groups:s,orderBy:r,userCount:a}=t;e.groups=s.map((e=>Object.assign({},E,e))),e.orderBy=r,e.userCount=a,e.groups=C(e.groups,e.orderBy)},addGroup(e,t){let{gid:s,displayName:r}=t;try{if(void 0!==e.groups.find((e=>e.id===s)))return;const t=Object.assign({},E,{id:s,name:r});e.groups.unshift(t),e.groups=C(e.groups,e.orderBy)}catch(e){P.error("Can't create group",e)}},renameGroup(e,t){let{gid:s,displayName:r}=t;const a=e.groups.findIndex((e=>e.id===s));if(a>=0){const t=e.groups[a];t.name=r,e.groups.splice(a,1,t),e.groups=C(e.groups,e.orderBy)}},removeGroup(e,t){const s=e.groups.findIndex((e=>e.id===t));s>=0&&e.groups.splice(s,1)},addUserGroup(e,t){let{userid:s,gid:r}=t;const a=e.groups.find((e=>e.id===r)),o=e.users.find((e=>e.id===s));a&&o.enabled&&e.userCount>0&&a.usercount++,o.groups.push(r),e.groups=C(e.groups,e.orderBy)},removeUserGroup(e,t){let{userid:s,gid:r}=t;const a=e.groups.find((e=>e.id===r)),o=e.users.find((e=>e.id===s));a&&o.enabled&&e.userCount>0&&a.usercount--;const i=o.groups;i.splice(i.indexOf(r),1),e.groups=C(e.groups,e.orderBy)},addUserSubAdmin(e,t){let{userid:s,gid:r}=t;e.users.find((e=>e.id===s)).subadmin.push(r)},removeUserSubAdmin(e,t){let{userid:s,gid:r}=t;const a=e.users.find((e=>e.id===s)).subadmin;a.splice(a.indexOf(r),1)},deleteUser(e,t){const s=e.users.findIndex((e=>e.id===t));this.commit("updateUserCounts",{user:e.users[s],actionType:"remove"}),e.users.splice(s,1)},addUserData(e,t){const s=t.data.ocs.data;e.users.unshift(s),this.commit("updateUserCounts",{user:s,actionType:"create"})},enableDisableUser(e,t){let{userid:s,enabled:r}=t;const a=e.users.find((e=>e.id===s));a.enabled=r,this.commit("updateUserCounts",{user:a,actionType:r?"enable":"disable"})},updateUserCounts(e,t){let{user:s,actionType:r}=t;if(0===e.userCount)return;const a=e.groups.find((e=>"disabled"===e.id));switch(r){case"enable":case"disable":a.usercount+=s.enabled?-1:1,e.userCount+=s.enabled?1:-1,s.groups.forEach((t=>{e.groups.find((e=>e.id===t)).disabled+=s.enabled?-1:1}));break;case"create":e.userCount++,s.groups.forEach((t=>{e.groups.find((e=>e.id===t)).usercount++}));break;case"remove":s.enabled?(e.userCount--,s.groups.forEach((t=>{const s=e.groups.find((e=>e.id===t));s?s.usercount--:P.warn("User group "+t+" does not exist during user removal")}))):(a.usercount--,s.groups.forEach((t=>{e.groups.find((e=>e.id===t)).disabled--})));break;default:L.A.error("Unknown action type in updateUserCounts: '".concat(r,"'"))}},setUserData(e,t){let{userid:s,key:r,value:a}=t;if("quota"===r){const t=(0,w.lT)(a,!0);e.users.find((e=>e.id===s))[r][r]=null!==t?t:a}else e.users.find((e=>e.id===s))[r]=a},resetUsers(e){e.users=[],e.usersOffset=0,e.disabledUsersOffset=0},setShowConfig(e,t){let{key:s,value:r}=t;e.showConfig[s]=r}},T=g.A.CancelToken;let O=null;const R={state:{users:[],groups:[],orderBy:1,minPasswordLength:0,usersOffset:0,usersLimit:25,disabledUsersOffset:0,disabledUsersLimit:25,userCount:0,showConfig:{showStoragePath:!1,showUserBackend:!1,showLastLogin:!1,showNewUserForm:!1,showLanguages:!1}},mutations:_,getters:{getUsers:e=>e.users,getGroups:e=>e.groups,getSubadminGroups:e=>e.groups.filter((e=>"admin"!==e.id&&"disabled"!==e.id)),getPasswordPolicyMinLength:e=>e.minPasswordLength,getUsersOffset:e=>e.usersOffset,getUsersLimit:e=>e.usersLimit,getDisabledUsersOffset:e=>e.disabledUsersOffset,getDisabledUsersLimit:e=>e.disabledUsersLimit,getUserCount:e=>e.userCount,getShowConfig:e=>e.showConfig},actions:{searchUsers(e,t){let{offset:s,limit:r,search:a}=t;return a="string"==typeof a?a:"",b((0,p.KT)("cloud/users/details?offset={offset}&limit={limit}&search={search}",{offset:s,limit:r,search:a})).catch((t=>{g.A.isCancel(t)||e.commit("API_FAILURE",t)}))},getUser:(e,t)=>b((0,p.KT)("cloud/users/".concat(t))).catch((t=>{g.A.isCancel(t)||e.commit("API_FAILURE",t)})),getUsers(e,t){let{offset:s,limit:r,search:a,group:o}=t;return O&&O.cancel("Operation canceled by another search request."),O=T.source(),a="string"==typeof a?a:"",a=a.replace(/in:[^\s]+/g,"").trim(),o="string"==typeof o?o:"",""!==o?b((0,p.KT)("cloud/groups/{group}/users/details?offset={offset}&limit={limit}&search={search}",{group:encodeURIComponent(o),offset:s,limit:r,search:a}),{cancelToken:O.token}).then((t=>{const s=Object.keys(t.data.ocs.data.users).length;return s>0&&e.commit("appendUsers",t.data.ocs.data.users),s})).catch((t=>{g.A.isCancel(t)||e.commit("API_FAILURE",t)})):b((0,p.KT)("cloud/users/details?offset={offset}&limit={limit}&search={search}",{offset:s,limit:r,search:a}),{cancelToken:O.token}).then((t=>{const s=Object.keys(t.data.ocs.data.users).length;return s>0&&e.commit("appendUsers",t.data.ocs.data.users),s})).catch((t=>{g.A.isCancel(t)||e.commit("API_FAILURE",t)}))},async getDisabledUsers(e,t){let{offset:s,limit:r,search:a}=t;const o=(0,p.KT)("cloud/users/disabled?offset={offset}&limit={limit}&search={search}",{offset:s,limit:r,search:a});try{const t=await b(o),s=Object.keys(t.data.ocs.data.users).length;return s>0&&(e.commit("appendUsers",t.data.ocs.data.users),e.commit("updateDisabledUsers",t.data.ocs.data.users)),s}catch(t){e.commit("API_FAILURE",t)}},getGroups(e,t){let{offset:s,limit:r,search:a}=t;a="string"==typeof a?a:"";const o=-1===r?"":"&limit=".concat(r);return b((0,p.KT)("cloud/groups?offset={offset}&search={search}",{offset:s,search:a})+o).then((t=>Object.keys(t.data.ocs.data.groups).length>0&&(t.data.ocs.data.groups.forEach((function(t){e.commit("addGroup",{gid:t,displayName:t})})),!0))).catch((t=>e.commit("API_FAILURE",t)))},getUsersFromList(e,t){let{offset:s,limit:r,search:a}=t;return a="string"==typeof a?a:"",b((0,p.KT)("cloud/users/details?offset={offset}&limit={limit}&search={search}",{offset:s,limit:r,search:a})).then((t=>Object.keys(t.data.ocs.data.users).length>0&&(e.commit("appendUsers",t.data.ocs.data.users),!0))).catch((t=>e.commit("API_FAILURE",t)))},getUsersFromGroup(e,t){let{groupid:s,offset:r,limit:a}=t;return b((0,p.KT)("cloud/users/{groupId}/details?offset={offset}&limit={limit}",{groupId:encodeURIComponent(s),offset:r,limit:a})).then((t=>e.commit("getUsersFromList",t.data.ocs.data.users))).catch((t=>e.commit("API_FAILURE",t)))},getPasswordPolicyMinLength:e=>!(!(0,v.F)().password_policy||!(0,v.F)().password_policy.minLength)&&(e.commit("setPasswordPolicyMinLength",(0,v.F)().password_policy.minLength),(0,v.F)().password_policy.minLength),addGroup:(e,t)=>A().then((s=>y((0,p.KT)("cloud/groups"),{groupid:t}).then((s=>(e.commit("addGroup",{gid:t,displayName:t}),{gid:t,displayName:t}))).catch((e=>{throw e})))).catch((s=>{throw e.commit("API_FAILURE",{gid:t,error:s}),s})),renameGroup(e,t){let{groupid:s,displayName:r}=t;return A().then((t=>I((0,p.KT)("cloud/groups/{groupId}",{groupId:encodeURIComponent(s)}),{key:"displayname",value:r}).then((t=>(e.commit("renameGroup",{gid:s,displayName:r}),{groupid:s,displayName:r}))).catch((e=>{throw e})))).catch((t=>{throw e.commit("API_FAILURE",{groupid:s,error:t}),t}))},removeGroup:(e,t)=>A().then((s=>U((0,p.KT)("cloud/groups/{groupId}",{groupId:encodeURIComponent(t)})).then((s=>e.commit("removeGroup",t))).catch((e=>{throw e})))).catch((s=>e.commit("API_FAILURE",{gid:t,error:s}))),addUserGroup(e,t){let{userid:s,gid:r}=t;return A().then((t=>y((0,p.KT)("cloud/users/{userid}/groups",{userid:s}),{groupid:r}).then((t=>e.commit("addUserGroup",{userid:s,gid:r}))).catch((e=>{throw e})))).catch((t=>e.commit("API_FAILURE",{userid:s,error:t})))},removeUserGroup(e,t){let{userid:s,gid:r}=t;return A().then((t=>U((0,p.KT)("cloud/users/{userid}/groups",{userid:s}),{groupid:r}).then((t=>e.commit("removeUserGroup",{userid:s,gid:r}))).catch((e=>{throw e})))).catch((t=>{throw e.commit("API_FAILURE",{userid:s,error:t}),t}))},addUserSubAdmin(e,t){let{userid:s,gid:r}=t;return A().then((t=>y((0,p.KT)("cloud/users/{userid}/subadmins",{userid:s}),{groupid:r}).then((t=>e.commit("addUserSubAdmin",{userid:s,gid:r}))).catch((e=>{throw e})))).catch((t=>e.commit("API_FAILURE",{userid:s,error:t})))},removeUserSubAdmin(e,t){let{userid:s,gid:r}=t;return A().then((t=>U((0,p.KT)("cloud/users/{userid}/subadmins",{userid:s}),{groupid:r}).then((t=>e.commit("removeUserSubAdmin",{userid:s,gid:r}))).catch((e=>{throw e})))).catch((t=>e.commit("API_FAILURE",{userid:s,error:t})))},wipeUserDevices:(e,t)=>A().then((e=>y((0,p.KT)("cloud/users/{userid}/wipe",{userid:t})).catch((e=>{throw e})))).catch((s=>e.commit("API_FAILURE",{userid:t,error:s}))),deleteUser:(e,t)=>A().then((s=>U((0,p.KT)("cloud/users/{userid}",{userid:t})).then((s=>e.commit("deleteUser",t))).catch((e=>{throw e})))).catch((s=>e.commit("API_FAILURE",{userid:t,error:s}))),addUser(e,t){let{commit:s,dispatch:r}=e,{userid:a,password:o,displayName:i,email:n,groups:d,subadmin:c,quota:u,language:l,manager:m}=t;return A().then((e=>y((0,p.KT)("cloud/users"),{userid:a,password:o,displayName:i,email:n,groups:d,subadmin:c,quota:u,language:l,manager:m}).then((e=>r("addUserData",a||e.data.ocs.data.id))).catch((e=>{throw e})))).catch((e=>{throw s("API_FAILURE",{userid:a,error:e}),e}))},addUserData:(e,t)=>A().then((s=>b((0,p.KT)("cloud/users/{userid}",{userid:t})).then((t=>e.commit("addUserData",t))).catch((e=>{throw e})))).catch((s=>e.commit("API_FAILURE",{userid:t,error:s}))),enableDisableUser(e,t){let{userid:s,enabled:r=!0}=t;const a=r?"enable":"disable";return A().then((t=>I((0,p.KT)("cloud/users/{userid}/{userStatus}",{userid:s,userStatus:a})).then((t=>e.commit("enableDisableUser",{userid:s,enabled:r}))).catch((e=>{throw e})))).catch((t=>e.commit("API_FAILURE",{userid:s,error:t})))},setUserData(e,t){let{userid:s,key:r,value:a}=t;const o=["email","displayname","manager"];return-1!==["email","language","quota","displayname","password","manager"].indexOf(r)&&"string"==typeof a&&(-1===o.indexOf(r)&&a.length>0||-1!==o.indexOf(r))?A().then((t=>I((0,p.KT)("cloud/users/{userid}",{userid:s}),{key:r,value:a}).then((t=>e.commit("setUserData",{userid:s,key:r,value:a}))).catch((e=>{throw e})))).catch((t=>e.commit("API_FAILURE",{userid:s,error:t}))):Promise.reject(new Error("Invalid request data"))},sendWelcomeMail:(e,t)=>A().then((e=>y((0,p.KT)("cloud/users/{userid}/welcome",{userid:t})).then((e=>!0)).catch((e=>{throw e})))).catch((s=>e.commit("API_FAILURE",{userid:t,error:s})))}};var F=r(85168),k=r(96763);const S={APPS_API_FAILURE(e,s){(0,F.Qg)(t("settings","An error occurred during the request. Unable to proceed.")+"<br>"+s.error.response.data.data.message,{isHTML:!0}),k.error(e,s)},initCategories(e,t){let{categories:s,updateCount:r}=t;e.categories=s,e.updateCount=r},updateCategories(e,t){e.gettingCategoriesPromise=t},setUpdateCount(e,t){e.updateCount=t},addCategory(e,t){e.categories.push(t)},appendCategories(e,t){e.categories=t},setAllApps(e,t){e.apps=t},setError(e,t){let{appId:s,error:r}=t;Array.isArray(s)||(s=[s]),s.forEach((t=>{e.apps.find((e=>e.id===t)).error=r}))},clearError(e,t){let{appId:s,error:r}=t;e.apps.find((e=>e.id===s)).error=null},enableApp(e,t){let{appId:s,groups:r}=t;const a=e.apps.find((e=>e.id===s));a.active=!0,a.groups=r},disableApp(e,t){const s=e.apps.find((e=>e.id===t));s.active=!1,s.groups=[],s.removable&&(s.canUnInstall=!0)},uninstallApp(e,t){e.apps.find((e=>e.id===t)).active=!1,e.apps.find((e=>e.id===t)).groups=[],e.apps.find((e=>e.id===t)).needsDownload=!0,e.apps.find((e=>e.id===t)).installed=!1,e.apps.find((e=>e.id===t)).canUnInstall=!1,e.apps.find((e=>e.id===t)).canInstall=!0},updateApp(e,t){const s=e.apps.find((e=>e.id===t)),r=s.update;s.update=null,s.version=r,e.updateCount--},resetApps(e){e.apps=[]},reset(e){e.apps=[],e.categories=[],e.updateCount=0},startLoading(e,t){Array.isArray(t)?t.forEach((t=>{a.Ay.set(e.loading,t,!0)})):a.Ay.set(e.loading,t,!0)},stopLoading(e,t){Array.isArray(t)?t.forEach((t=>{a.Ay.set(e.loading,t,!1)})):a.Ay.set(e.loading,t,!1)}},D={enableApp(e,s){let r,{appId:a,groups:o}=s;return r=Array.isArray(a)?a:[a],A().then((s=>(e.commit("startLoading",r),e.commit("startLoading","install"),y((0,p.Jv)("settings/apps/enable"),{appIds:r,groups:o}).then((s=>(e.commit("stopLoading",r),e.commit("stopLoading","install"),r.forEach((t=>{e.commit("enableApp",{appId:t,groups:o})})),g.A.get((0,p.Jv)("apps/files/")).then((()=>{s.data.update_required&&((0,F.cf)(t("settings","The app has been enabled but needs to be updated. You will be redirected to the update page in 5 seconds."),{onClick:()=>window.location.reload(),close:!1}),setTimeout((function(){location.reload()}),5e3))})).catch((()=>{Array.isArray(a)||((0,F.Qg)(t("settings","Error: This app cannot be enabled because it makes the server unstable")),e.commit("setError",{appId:r,error:t("settings","Error: This app cannot be enabled because it makes the server unstable")}),e.dispatch("disableApp",{appId:a}))}))))).catch((t=>{e.commit("stopLoading",r),e.commit("stopLoading","install"),e.commit("setError",{appId:r,error:t.response.data.data.message}),e.commit("APPS_API_FAILURE",{appId:a,error:t})}))))).catch((t=>e.commit("API_FAILURE",{appId:a,error:t})))},forceEnableApp(e,t){let s,{appId:r,groups:a}=t;return s=Array.isArray(r)?r:[r],A().then((()=>(e.commit("startLoading",s),e.commit("startLoading","install"),y((0,p.Jv)("settings/apps/force"),{appId:r}).then((e=>{location.reload()})).catch((t=>{e.commit("stopLoading",s),e.commit("stopLoading","install"),e.commit("setError",{appId:s,error:t.response.data.data.message}),e.commit("APPS_API_FAILURE",{appId:r,error:t})}))))).catch((t=>e.commit("API_FAILURE",{appId:r,error:t})))},disableApp(e,t){let s,{appId:r}=t;return s=Array.isArray(r)?r:[r],A().then((t=>(e.commit("startLoading",s),y((0,p.Jv)("settings/apps/disable"),{appIds:s}).then((t=>(e.commit("stopLoading",s),s.forEach((t=>{e.commit("disableApp",t)})),!0))).catch((t=>{e.commit("stopLoading",s),e.commit("APPS_API_FAILURE",{appId:r,error:t})}))))).catch((t=>e.commit("API_FAILURE",{appId:r,error:t})))},uninstallApp(e,t){let{appId:s}=t;return A().then((t=>(e.commit("startLoading",s),b((0,p.Jv)("settings/apps/uninstall/".concat(s))).then((t=>(e.commit("stopLoading",s),e.commit("uninstallApp",s),!0))).catch((t=>{e.commit("stopLoading",s),e.commit("APPS_API_FAILURE",{appId:s,error:t})}))))).catch((t=>e.commit("API_FAILURE",{appId:s,error:t})))},updateApp(e,t){let{appId:s}=t;return A().then((t=>(e.commit("startLoading",s),e.commit("startLoading","install"),b((0,p.Jv)("settings/apps/update/".concat(s))).then((t=>(e.commit("stopLoading","install"),e.commit("stopLoading",s),e.commit("updateApp",s),!0))).catch((t=>{e.commit("stopLoading",s),e.commit("stopLoading","install"),e.commit("APPS_API_FAILURE",{appId:s,error:t})}))))).catch((t=>e.commit("API_FAILURE",{appId:s,error:t})))},getAllApps:e=>(e.commit("startLoading","list"),b((0,p.Jv)("settings/apps/list")).then((t=>(e.commit("setAllApps",t.data.apps),e.commit("stopLoading","list"),!0))).catch((t=>e.commit("API_FAILURE",t)))),async getCategories(e){let{shouldRefetchCategories:t=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t||!e.state.gettingCategoriesPromise){e.commit("startLoading","categories");try{const t=b((0,p.Jv)("settings/apps/categories"));e.commit("updateCategories",t);const s=await t;return s.data.length>0?(e.commit("appendCategories",s.data),e.commit("stopLoading","categories"),!0):(e.commit("stopLoading","categories"),!1)}catch(t){e.commit("API_FAILURE",t)}}return e.state.gettingCategoriesPromise}},G={state:{apps:[],categories:[],updateCount:0,loading:{},loadingList:!1,gettingCategoriesPromise:null},mutations:S,getters:{loading:e=>function(t){return e.loading[t]},getCategories:e=>e.categories,getAllApps:e=>e.apps,getUpdateCount:e=>e.updateCount,getCategoryById:e=>t=>e.categories.find((e=>e.id===t))},actions:D},K={state:{serverData:{}},mutations:{setServerData(e,t){e.serverData=t}},getters:{getServerData:e=>e.serverData},actions:{}},j={state:{},mutations:{},getters:{},actions:{setAppConfig(e,t){let{app:s,key:r,value:a}=t;return A().then((e=>y((0,p.KT)("apps/provisioning_api/api/v1/config/apps/{app}/{key}",{app:s,key:r}),{value:a}).catch((e=>{throw e})))).catch((t=>e.commit("API_FAILURE",{app:s,key:r,value:a,error:t})))}}};var x=r(96763);a.Ay.use(m.Ay);const N={API_FAILURE(e,s){try{const e=s.error.response.data.ocs.meta.message;(0,F.Qg)(t("settings","An error occurred during the request. Unable to proceed.")+"<br>"+e,{isHTML:!0})}catch(e){(0,F.Qg)(t("settings","An error occurred during the request. Unable to proceed."))}x.error(e,s)}},B=new m.il({modules:{users:R,apps:G,settings:K,oc:j},strict:!1,mutations:N});r(32981);const q=()=>Promise.all([r.e(4208),r.e(3239)]).then(r.bind(r,84146)),M=()=>Promise.all([r.e(4208),r.e(4529)]).then(r.bind(r,86470));a.Ay.use(u.Ay);const J=document.title,$=new u.Ay({mode:"history",base:(0,p.Jv)(""),linkActiveClass:"active",routes:[{path:"/:index(index.php/)?settings/users",component:q,props:!0,name:"users",meta:{title:()=>t("settings","Active users")},children:[{path:":selectedGroup",name:"group",meta:{title:e=>"admin"===e.params.selectedGroup?t("settings","Admins"):"disabled"===e.params.selectedGroup?t("settings","Disabled users"):decodeURIComponent(e.params.selectedGroup)},component:q}]},{path:"/:index(index.php/)?settings/apps",component:M,props:!0,name:"apps",meta:{title:()=>t("settings","Your apps")},children:[{path:":category",name:"apps-category",meta:{title:async e=>{if("apps"===e.name)return t("settings","Your apps");if(l.l[e.params.category])return l.l[e.params.category];await B.dispatch("getCategories");const s=B.getters.getCategoryById(e.params.category);return s.displayName?s.displayName:void 0}},component:M,children:[{path:":id",name:"apps-details",component:M}]}]}]});$.afterEach((async e=>{var t,s;const r=await(null===(t=(s=e.meta).title)||void 0===t?void 0:t.call(s,e));r?(document.title="".concat(r," - ").concat(J),function(e){const t=document.getElementById("page-heading-level-1");t&&(t.textContent=e)}(r)):document.title=J}));const H=$;a.Ay.use(o.Ay,{defaultHtml:!1}),(0,i.O)(B,H),r.nc=btoa(OC.requestToken),a.Ay.prototype.t=t,a.Ay.prototype.n=n,a.Ay.prototype.OC=OC,a.Ay.prototype.OCA=OCA,a.Ay.prototype.oc_userconfig=oc_userconfig,new a.Ay({router:H,store:B,render:e=>e(c)}).$mount("#content")},58723:(e,t)=>{function s(e,t){var r={name:e.name,path:e.path,hash:e.hash,query:e.query,params:e.params,fullPath:e.fullPath,meta:e.meta};return t&&(r.from=s(t)),Object.freeze(r)}t.O=function(e,t,r){var a=(r||{}).moduleName||"route";e.registerModule(a,{namespaced:!0,state:s(t.currentRoute),mutations:{ROUTE_CHANGED:function(t,r){e.state[a]=s(r.to,r.from)}}});var o,i=!1,n=e.watch((function(e){return e[a]}),(function(e){var s=e.fullPath;s!==o&&(null!=o&&(i=!0,t.push(e)),o=s)}),{sync:!0}),d=t.afterEach((function(t,s){i?i=!1:(o=t.fullPath,e.commit(a+"/ROUTE_CHANGED",{to:t,from:s}))}));return function(){null!=d&&d(),null!=n&&n(),e.unregisterModule(a)}}}},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var s=o[e]={id:e,loaded:!1,exports:{}};return a[e].call(s.exports,s,s.exports,i),s.loaded=!0,s.exports}i.m=a,e=[],i.O=(t,s,r,a)=>{if(!s){var o=1/0;for(u=0;u<e.length;u++){s=e[u][0],r=e[u][1],a=e[u][2];for(var n=!0,d=0;d<s.length;d++)(!1&a||o>=a)&&Object.keys(i.O).every((e=>i.O[e](s[d])))?s.splice(d--,1):(n=!1,a<o&&(o=a));if(n){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[s,r,a]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,s)=>(i.f[s](e,t),t)),[])),i.u=e=>(({3239:"settings-users",4529:"settings-apps-view"}[e]||e)+"-"+e+".js?v="+{3239:"cf535e1c526768b5722e",4065:"046658418d1a5670e146",4254:"96661b9f421b07ce7189",4529:"8bc919117841cb654773"}[e]),i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s={},r="nextcloud:",i.l=(e,t,a,o)=>{if(s[e])s[e].push(t);else{var n,d;if(void 0!==a)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var p=c[u];if(p.getAttribute("src")==e||p.getAttribute("data-webpack")==r+a){n=p;break}}n||(d=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,i.nc&&n.setAttribute("nonce",i.nc),n.setAttribute("data-webpack",r+a),n.src=e),s[e]=[t];var l=(t,r)=>{n.onerror=n.onload=null,clearTimeout(m);var a=s[e];if(delete s[e],n.parentNode&&n.parentNode.removeChild(n),a&&a.forEach((e=>e(r))),t)return t(r)},m=setTimeout(l.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=l.bind(null,n.onerror),n.onload=l.bind(null,n.onload),d&&document.head.appendChild(n)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),i.j=2689,(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var s=t.getElementsByTagName("script");if(s.length)for(var r=s.length-1;r>-1&&(!e||!/^http(s?):/.test(e));)e=s[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{i.b=document.baseURI||self.location.href;var e={2689:0};i.f.j=(t,s)=>{var r=i.o(e,t)?e[t]:void 0;if(0!==r)if(r)s.push(r[2]);else{var a=new Promise(((s,a)=>r=e[t]=[s,a]));s.push(r[2]=a);var o=i.p+i.u(t),n=new Error;i.l(o,(s=>{if(i.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var a=s&&("load"===s.type?"missing":s.type),o=s&&s.target&&s.target.src;n.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",n.name="ChunkLoadError",n.type=a,n.request=o,r[1](n)}}),"chunk-"+t,t)}},i.O.j=t=>0===e[t];var t=(t,s)=>{var r,a,o=s[0],n=s[1],d=s[2],c=0;if(o.some((t=>0!==e[t]))){for(r in n)i.o(n,r)&&(i.m[r]=n[r]);if(d)var u=d(i)}for(t&&t(s);c<o.length;c++)a=o[c],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(u)},s=self.webpackChunknextcloud=self.webpackChunknextcloud||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})(),i.nc=void 0;var d=i.O(void 0,[4208],(()=>i(47027)));d=i.O(d)})();
//# sourceMappingURL=settings-vue-settings-apps-users-management.js.map?v=6ac194fd27b4240adba7