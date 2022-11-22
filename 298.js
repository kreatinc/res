"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[298],{2298:(t,s,i)=>{i.r(s),i.d(s,{default:()=>a});const e={data:function(){return{loading:!1,msg:{errors:window.nerrors,success:window.nsuccess,warnings:window.nwarnings,infos:window.ninfos,footercontent:window.nfooterContent},user:window.nuelinkUser,notifications:{sendEmailForFailedPosts:1,sendEmailForPublishedPosts:1,sendEmailForNewPostsViaAutomations:1,sendEmailForEmptyQueue:1}}},created:function(){document.title="Nuelink - Notifications",this.getNotifications()},methods:{getNotifications:function(){var t=this,s=this;this.loading=!0,axios.get("/api/settings").then((function(i){t.notifications=i.data.data,s.loading=!1})).catch((function(t){s.loading=!1}))},updateNotifications:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",s=this;this.loading=!0,axios.put("/api/settings",this.notifications).then((function(i){s.loading=!1,notyMsg({text:"The notification settings of the ".concat(t," was updated successfully."),type:"success"})})).catch((function(t){s.loading=!1,notyMsg({text:t&&t.response&&t.response.data&&t.response.data.error?t.response.data.error:"Something went wrong! we could not update notifications settings! please try again.",type:"error"})}))}},mounted:function(){}};const a=(0,i(1900).Z)(e,(function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"container-fluid",class:{loading:t.loading}},[i("div",{staticClass:"row justify-content-center"},[i("div",{staticClass:"col-12 col-lg-10 col-xxl-9"},[i("div",{staticClass:"header mt-md-5"},[i("div",{staticClass:"header-body"},[t._m(0),t._v(" "),i("div",{staticClass:"row align-items-center"},[i("div",{staticClass:"col"},[i("ul",{staticClass:"nav nav-tabs nav-overflow header-tabs"},[i("li",{staticClass:"nav-item"},[i("router-link",{staticClass:"nav-link",attrs:{to:"/settings",exact:""}},[t._v(" General ")])],1),t._v(" "),i("li",{staticClass:"nav-item"},[i("router-link",{staticClass:"nav-link",attrs:{to:"/settings/billing"}},[t._v(" Billing ")])],1),t._v(" "),i("li",{staticClass:"nav-item"},[i("router-link",{staticClass:"nav-link active",attrs:{to:"/settings/notifications"}},[t._v(" Notifications ")])],1),t._v(" "),i("li",{directives:[{name:"show",rawName:"v-show",value:t.user&&-1!=t.user.email.indexOf("@kreatinc.com"),expression:"user && user.email.indexOf('@kreatinc.com') != -1"}],staticClass:"nav-item"},[i("router-link",{staticClass:"nav-link",attrs:{to:"/settings/referral"}},[t._v(" Referral Program ")])],1)])])])])]),t._v(" "),t.msg.success?i("div",{staticClass:"alert alert-success mb-4"},[t._v(" "+t._s(t.msg.success)+" ")]):t._e(),t._v(" "),t._l(t.msg.warnings,(function(s){return i("div",{key:s,staticClass:"alert alert-warning mb-4",domProps:{innerHTML:t._s(s)}})})),t._v(" "),t._l(t.msg.errors,(function(s){return i("div",{key:s,staticClass:"alert alert-danger mb-4",attrs:{role:"alert"}},[t._v(" "+t._s(s)+" ")])})),t._v(" "),t._l(t.msg.infos,(function(s){return i("div",{key:s,domProps:{innerHTML:t._s(s)}})})),t._v(" "),i("h2",{staticClass:"mb-2"},[t._v("\n          Notifications\n        ")]),t._v(" "),i("p",{staticClass:"text-muted mb-5"},[t._v("\n          Set your email notificaions preferences.\n        ")]),t._v(" "),i("div",{staticClass:"card"},[i("div",{staticClass:"table-responsive"},[i("table",{staticClass:"table table-sm table-nowrap card-table"},[i("tbody",{staticClass:"fs-base"},[i("tr",[i("td",[t._v("\n                    When a post fails to be published\n                  ")]),t._v(" "),i("td",{attrs:{width:"90"}},[i("div",{staticClass:"form-check form-switch"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.notifications.sendEmailForFailedPosts,expression:"notifications.sendEmailForFailedPosts"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"switchTwo"},domProps:{checked:Array.isArray(t.notifications.sendEmailForFailedPosts)?t._i(t.notifications.sendEmailForFailedPosts,null)>-1:t.notifications.sendEmailForFailedPosts},on:{change:[function(s){var i=t.notifications.sendEmailForFailedPosts,e=s.target,a=!!e.checked;if(Array.isArray(i)){var n=t._i(i,null);e.checked?n<0&&t.$set(t.notifications,"sendEmailForFailedPosts",i.concat([null])):n>-1&&t.$set(t.notifications,"sendEmailForFailedPosts",i.slice(0,n).concat(i.slice(n+1)))}else t.$set(t.notifications,"sendEmailForFailedPosts",a)},function(s){return t.updateNotifications("failed posts")}]}}),t._v(" "),i("label",{staticClass:"form-check-label",attrs:{for:"switchTwo"}})])])]),t._v(" "),i("tr",[i("td",[t._v("\n                    When a post is published\n                  ")]),t._v(" "),i("td",{attrs:{width:"90"}},[i("div",{staticClass:"form-check form-switch"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.notifications.sendEmailForPublishedPosts,expression:"notifications.sendEmailForPublishedPosts"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"switchTwo2"},domProps:{checked:Array.isArray(t.notifications.sendEmailForPublishedPosts)?t._i(t.notifications.sendEmailForPublishedPosts,null)>-1:t.notifications.sendEmailForPublishedPosts},on:{change:[function(s){var i=t.notifications.sendEmailForPublishedPosts,e=s.target,a=!!e.checked;if(Array.isArray(i)){var n=t._i(i,null);e.checked?n<0&&t.$set(t.notifications,"sendEmailForPublishedPosts",i.concat([null])):n>-1&&t.$set(t.notifications,"sendEmailForPublishedPosts",i.slice(0,n).concat(i.slice(n+1)))}else t.$set(t.notifications,"sendEmailForPublishedPosts",a)},function(s){return t.updateNotifications("published posts")}]}}),t._v(" "),i("label",{staticClass:"form-check-label",attrs:{for:"switchTwo2"}})])])]),t._v(" "),i("tr",[i("td",[t._v("\n                    When new posts are added via automation\n                  ")]),t._v(" "),i("td",{attrs:{width:"90"}},[i("div",{staticClass:"form-check form-switch"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.notifications.sendEmailForNewPostsViaAutomations,expression:"notifications.sendEmailForNewPostsViaAutomations"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"switchTwo3"},domProps:{checked:Array.isArray(t.notifications.sendEmailForNewPostsViaAutomations)?t._i(t.notifications.sendEmailForNewPostsViaAutomations,null)>-1:t.notifications.sendEmailForNewPostsViaAutomations},on:{change:[function(s){var i=t.notifications.sendEmailForNewPostsViaAutomations,e=s.target,a=!!e.checked;if(Array.isArray(i)){var n=t._i(i,null);e.checked?n<0&&t.$set(t.notifications,"sendEmailForNewPostsViaAutomations",i.concat([null])):n>-1&&t.$set(t.notifications,"sendEmailForNewPostsViaAutomations",i.slice(0,n).concat(i.slice(n+1)))}else t.$set(t.notifications,"sendEmailForNewPostsViaAutomations",a)},function(s){return t.updateNotifications("posts are added via automation")}]}}),t._v(" "),i("label",{staticClass:"form-check-label",attrs:{for:"switchTwo3"}})])])]),t._v(" "),i("tr",[i("td",[t._v("\n                    When your Queue becomes empty\n                  ")]),t._v(" "),i("td",{attrs:{width:"90"}},[i("div",{staticClass:"form-check form-switch"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.notifications.sendEmailForEmptyQueue,expression:"notifications.sendEmailForEmptyQueue"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"switchTwo4"},domProps:{checked:Array.isArray(t.notifications.sendEmailForEmptyQueue)?t._i(t.notifications.sendEmailForEmptyQueue,null)>-1:t.notifications.sendEmailForEmptyQueue},on:{change:[function(s){var i=t.notifications.sendEmailForEmptyQueue,e=s.target,a=!!e.checked;if(Array.isArray(i)){var n=t._i(i,null);e.checked?n<0&&t.$set(t.notifications,"sendEmailForEmptyQueue",i.concat([null])):n>-1&&t.$set(t.notifications,"sendEmailForEmptyQueue",i.slice(0,n).concat(i.slice(n+1)))}else t.$set(t.notifications,"sendEmailForEmptyQueue",a)},function(s){return t.updateNotifications("Queue becomes empty")}]}}),t._v(" "),i("label",{staticClass:"form-check-label",attrs:{for:"switchTwo4"}})])])])])])])]),t._v(" "),i("br"),t._v(" "),t._l(t.msg.footercontent,(function(s,e){return i("div",{key:e,staticClass:"mt-7",domProps:{innerHTML:t._s(s)}})}))],2)])])}),[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"row align-items-center"},[i("div",{staticClass:"col"},[i("h6",{staticClass:"header-pretitle"},[t._v(" Setup ")]),t._v(" "),i("h1",{staticClass:"header-title"},[t._v("\n                  Account\n                ")])])])}],!1,null,null,null).exports}}]);