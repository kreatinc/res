"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[347],{9347:(t,s,a)=>{a.r(s),a.d(s,{default:()=>l});function e(t,s){return function(t){if(Array.isArray(t))return t}(t)||function(t,s){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var e,i,n=[],l=!0,r=!1;try{for(a=a.call(t);!(l=(e=a.next()).done)&&(n.push(e.value),!s||n.length!==s);l=!0);}catch(t){r=!0,i=t}finally{try{l||null==a.return||a.return()}finally{if(r)throw i}}return n}(t,s)||function(t,s){if(!t)return;if("string"==typeof t)return i(t,s);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return i(t,s)}(t,s)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,s){(null==s||s>t.length)&&(s=t.length);for(var a=0,e=new Array(s);a<s;a++)e[a]=t[a];return e}const n={data:function(){return{loading:!1,reload:!0,msg:{errors:window.nerrors,success:window.nsuccess,warnings:window.nwarnings,infos:window.ninfos,footercontent:window.nfooterContent},user:window.nuelinkUser,statics:{},posts:[],pagination:{}}},created:function(){document.title="Nuelink - History Posts Admin",this.getPosts(!1)},computed:{},methods:{paginationUrl:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(t){var s=new URL(t),a=s&&s.searchParams.get("page")?s.searchParams.get("page"):1,e=new URL(window.location.href);return e.searchParams.set("page",a),e.href}},channelThumbnail:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return t&&t?t.thumbnail&&-1!=t.thumbnail.indexOf("http")?t.thumbnail:"/media/"+t.thumbnail:""},postStatusMsg:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(t)return"PUBLISHED"==t.status?"Published successfully on "+(t.channel?t.channel.title:" a removed channel"):t.message?t.message:"Failed to publish on "+(t.channel?t.channel.title:" a removed channel")},postText:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:60;return window.innerWidth>1700&&(s+=20),t.length>s&&(t=t.substring(0,s)+"..."),t},statusText:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return"PENDING"==t?'<span class="badge bg-warning">'+t+"</span>":"PUBLISHED"==t?'<span class="badge bg-success">'+t+"</span>":'<span class="badge bg-secondary-soft">'+t+"</span>"},postType:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return"QUEUE"==t?'<span class="badge bg-primary">'+t+"</span>":"SCHEDULE"==t?'<span class="badge bg-info">'+t+"</span>":"NOW"==t?'<span class="badge bg-info-soft">'+t+"</span>":'<span class="badge bg-secondary-soft">'+t+"</span>"},getPosts:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,n=this,l="/api/admin/remote_posts";i&&i.length>0?l="/api/admin/search?search="+i:(t||s||a)&&(l+="?".concat(s?"limit="+s:"").concat(t?"&all=1":"").concat(a?"&plans="+a:""));var r=new URL(window.location.href),o=r&&r.searchParams.get("page")?r.searchParams.get("page"):1;l="".concat(l,"?page=").concat(o),n.reload=!1,n.loading=!0,axios.get(l).then((function(t){n.posts=t.data.data;for(var s=0,a=Object.entries(t.data.meta);s<a.length;s++){var i=e(a[s],2),l=i[0],r=i[1];n.pagination[l]=r}n.loading=!0;try{$('[data-toggle="tooltip"]').tooltip()}catch(t){setTimeout((function(){$('[data-toggle="tooltip"]').tooltip()}),1e3)}n.reload=!0,setTimeout((function(){n.loading=!1,initList()}),300)})).catch((function(t){n.reload=!0,n.loading=!1,n.getPosts(!1)}))},dtFormat:function(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return window.dtFormat(t,s,a)}},mounted:function(){}};const l=(0,a(1900).Z)(n,(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container-fluid",class:{loading:t.loading}},[a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-12"},[t._m(0),t._v(" "),t.msg.success?a("div",{staticClass:"alert alert-success mb-4"},[t._v(" "+t._s(t.msg.success)+" ")]):t._e(),t._v(" "),t._l(t.msg.warnings,(function(s){return a("div",{key:s,staticClass:"alert alert-warning mb-4",domProps:{innerHTML:t._s(s)}})})),t._v(" "),t._l(t.msg.errors,(function(s){return a("div",{key:s,staticClass:"alert alert-danger mb-4",attrs:{role:"alert"}},[t._v(" "+t._s(s)+" ")])})),t._v(" "),t._l(t.msg.infos,(function(s){return a("div",{key:s,domProps:{innerHTML:t._s(s)}})})),t._v(" "),a("div",{staticClass:"card border px-4"},[a("ul",{staticClass:"nav nav-tabs border-0",attrs:{id:"collectionTabs"}},[a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/admin/posts",exact:""}},[t._v("All")])],1),t._v(" "),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link active",attrs:{to:"/admin/history"}},[t._v("History")])],1)])]),t._v(" "),t.reload?a("div",{staticClass:"card",attrs:{"data-list":'{"valueNames": ["item-userid", "item-body", "item-channel" , "item-likes","item-comments","item-shares", "item-status", "item-collection" , "item-published"], "page": 50, "pagination": {"paginationClass": "list-pagination"} }',id:"posts"}},[t._m(1),t._v(" "),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-sm table-hover table-nowrap card-table table-valign-middle"},[t.posts&&t.posts.length>0?a("thead",[t._m(2)]):t._e(),t._v(" "),a("tbody",{staticClass:"list fs-base"},[!t.posts||t.posts&&t.posts.length<1?a("tr",[a("td",{staticClass:"fs-2 text-center text-muted"},[t._v("All posts will appear here.")])]):t._e(),t._v(" "),t._l(t.posts,(function(s,e){return a("tr",{key:e},[t._m(3,!0),t._v(" "),a("td",{staticClass:"item-userid"},[t._v(t._s(s.user_id))]),t._v(" "),a("td",[a("div",{staticClass:"align-items-center d-flex"},[a("a",{staticClass:"d-block item-body mb-2 text-reset",attrs:{href:"#!","data-toggle":"tooltip",title:s.body&&s.body.length>60?s.body:null}},[t._v(t._s(t.postText(s.body?s.body:"")))]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:s.media,expression:"post.media"}],staticClass:"avatar ms-3"},["IMAGE"==s.postType?a("a",{attrs:{hreff:"#!"}},[a("img",{staticClass:"avatar-img rounded",attrs:{src:s.media?-1!=s.media.indexOf("http")?s.media:"/media/thumb/"+s.media:null,onerror:"this.onerror=null;this.src='/img/image-not-found.jpg';",alt:"post image"}})]):t._e(),t._v(" "),["VIDEO","TIKTOK"].includes(s.postType)?a("video",{staticClass:"avatar-img rounded",staticStyle:{background:"#9d9d9d",border:"1px solid #eee","border-radius":"4px"},on:{click:function(t){this.paused?this.play():this.pause()}}},[a("source",{attrs:{src:s.media?-1!=s.media.indexOf("http")?s.media:"/media/"+s.media:null}})]):t._e()])])]),t._v(" "),a("td",[a("span",{staticClass:"item-channel",attrs:{hidden:""}},[t._v(" "+t._s(s.channel?s.channel.title:"channel was removed")+" ")]),t._v(" "),a("a",{staticClass:"avatar",style:s.remoteLink?"":"pointer-events: none; opacity: .5;",attrs:{href:s.remoteLink,target:[s.remoteLink?"_blank":"#!"],"data-placement":"top",title:s.channel?s.channel.title:"channel was removed","data-toggle":"tooltip"}},[s.channel&&s.channel.thumbnail?a("img",{staticClass:"avatar-img",attrs:{src:t.channelThumbnail(s.channel),alt:s.channel?s.channel.title:"",onerror:"this.onerror=null;this.src='/img/image-not-found.jpg';"},on:{error:function(t){s.channel.thumbnail=null}}}):a("span",{class:"avatar-title rounded-circle bg-"+(s.channel?s.channel.type.split("-")[0]:"x")},[t._v(t._s(s.channel&&s.channel.title?s.channel.title.substring(0,2).toUpperCase():"NF"))]),t._v(" "),a("i",{class:"fe fe-"+(s.channel?s.channel.type.split("-")[0]:"x")+" btn-"+(s.channel?s.channel.type.split("-")[0]:" bg-danger text-white")+" avatar-icon"})])]),t._v(" "),a("td",[a("span",{class:"item-status badge text-capitalize "+("PUBLISHED"==s.status?"bg-success-soft":"SKIPPED"==s.status?"bg-warning-soft":"bg-danger-soft"),attrs:{title:t.postStatusMsg(s),"data-toggle":"tooltip"}},[t._v(" "+t._s(s.status.toLowerCase()))])]),t._v(" "),a("td",{staticClass:"item-likes"},[t._v("\n                                "+t._s(null!=s.likes?s.likes:"-")+"\n                              ")]),t._v(" "),a("td",{staticClass:"item-comments"},[t._v("\n                                "+t._s(null!=s.comments?s.comments:"-")+"\n                              ")]),t._v(" "),a("td",{staticClass:"item-shares"},[t._v("\n                                "+t._s(null!=s.shares?s.shares:"-")+"\n                              ")]),t._v(" "),a("td",{staticClass:"item-collection"},[t._v(t._s(s.collectionId))]),t._v(" "),a("td",[a("time",{staticClass:"item-published d-block mb-1",attrs:{datetime:s.createdAt}},[t._v(t._s(t.dtFormat(s.createdAt,"d")))]),t._v(" "),a("span",{staticClass:"text-muted small"},[t._v(t._s(t.dtFormat(s.createdAt,"ts")))])]),t._v(" "),t._m(4,!0)])}))],2)])]),t._v(" "),t.posts&&t.posts.length>0?a("div",{staticClass:"card-footer d-flex justify-content-center"},[t.pagination&&t.posts&&t.pagination.total>50?a("nav",{attrs:{"aria-label":"navigation"}},[a("ul",{staticClass:"pagination"},t._l(t.pagination.links,(function(s,e){return a("li",{key:e,staticClass:"page-item",class:s.active?"active":""},[a("a",{staticClass:"page-link",class:!s.url||s.active?"disabled opacity-50":"",attrs:{href:t.paginationUrl(s.url)},domProps:{innerHTML:t._s(s.page||s.label||e+1)}})])})),0)]):t._e()]):t._e()]):t._e()],2)])])}),[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"header"},[a("div",{staticClass:"header-body"},[a("div",{staticClass:"row align-items-center"},[a("div",{staticClass:"col"},[a("h6",{staticClass:"header-pretitle"},[t._v("\n                              Admin\n                          ")]),t._v(" "),a("h1",{staticClass:"header-title"},[t._v(" History ")])]),t._v(" "),a("div",{staticClass:"col-auto"})])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"card-header"},[a("div",{staticClass:"row align-items-center"},[a("div",{staticClass:"col"},[a("form",{staticClass:"mb-0"},[a("div",{staticClass:"input-group input-group-flush input-group-merge input-group-reverse"},[a("input",{staticClass:"form-control list-search",attrs:{type:"search",placeholder:"Search"}}),t._v(" "),a("span",{staticClass:"input-group-text"},[a("i",{staticClass:"fe fe-search"})])])])]),t._v(" "),a("div",{staticClass:"col-auto me-n3",attrs:{hidden:""}},[a("form",{staticClass:"mb-0"},[a("select",{staticClass:"form-select form-select-sm form-control-flush list-page",attrs:{"data-choices":'{"searchEnabled": false}'}},[a("option",{attrs:{value:"25",selected:""}},[t._v("25 per page")]),t._v(" "),a("option",{attrs:{value:"50"}},[t._v("50 per page")]),t._v(" "),a("option",{attrs:{value:"100"}},[t._v("100 per page")])])])]),t._v(" "),a("div",{staticClass:"col-auto",attrs:{hidden:""}},[a("div",{staticClass:"dropdown"},[a("button",{staticClass:"btn btn-sm btn-white",attrs:{type:"button","data-bs-toggle":"dropdown","data-bs-auto-close":"outside","aria-haspopup":"true","aria-expanded":"false"}},[a("i",{staticClass:"fe fe-sliders me-1"}),t._v(" Filter "),a("span",{staticClass:"badge bg-primary ms-1 list-filter-number"})]),t._v(" "),a("form",{staticClass:"dropdown-menu dropdown-menu-end dropdown-menu-card"},[a("div",{staticClass:"card-header"},[a("h4",{staticClass:"card-header-title"},[t._v("\n                                        Filters\n                                      ")]),t._v(" "),a("button",{staticClass:"btn btn-sm btn-link text-reset",attrs:{type:"reset"}},[a("small",[t._v("Clear filters")])])]),t._v(" "),a("div",{staticClass:"card-body"},[a("div",{staticClass:"list-group list-group-flush mt-n4 mb-4"},[a("div",{staticClass:"list-group-item"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("small",[t._v("Plan")])]),t._v(" "),a("div",{staticClass:"col-auto"},[a("select",{staticClass:"form-select form-select-sm",attrs:{"data-filter":"item-plan","data-choices":'{"searchEnabled": false}'}},[a("option",{attrs:{value:"*",selected:""}},[t._v("Any")]),t._v(" "),a("option",{attrs:{value:"FREE"}},[t._v("Free")]),t._v(" "),a("option",{attrs:{value:"STANDARD"}},[t._v("Standard")]),t._v(" "),a("option",{attrs:{value:"PREMIUM"}},[t._v("Premium")])])])])]),t._v(" "),a("div",{staticClass:"list-group-item"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("small",[t._v("Status")])]),t._v(" "),a("div",{staticClass:"col-auto"},[a("select",{staticClass:"form-select form-select-sm",attrs:{"data-filter":"item-status","data-choices":'{"searchEnabled": false}'}},[a("option",{attrs:{value:"*",selected:""}},[t._v("Any")]),t._v(" "),a("option",{attrs:{value:"Active"}},[t._v("Active")]),t._v(" "),a("option",{attrs:{value:"Inactive"}},[t._v("Inactive")])])])])])]),t._v(" "),a("button",{staticClass:"btn w-100 btn-primary list-filter-submit",attrs:{type:"button"}},[t._v("\n                                          Apply filter\n                                      ")])])])])])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("tr",[a("th",[a("div",{staticClass:"form-check mb-n2"},[a("input",{staticClass:"form-check-input list-checkbox-all",attrs:{id:"listCheckboxAll",type:"checkbox"}}),t._v(" "),a("label",{staticClass:"form-check-label",attrs:{for:"listCheckboxAll"}})])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-userid",href:"#"}},[t._v("User Id")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-body",href:"#"}},[t._v("Body")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-channel",href:"#"}},[t._v("Channel")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-status",href:"#"}},[t._v("Status")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-likes",href:"#"}},[t._v("Likes")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-comments",href:"#"}},[t._v("Comments")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-shares",href:"#"}},[t._v("Shares")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-collection",href:"#"}},[t._v("Collection")])]),t._v(" "),a("th",{attrs:{colspan:"2"}},[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-published",href:"#"}},[t._v("Published At")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("td",[a("div",{staticClass:"form-check"},[a("input",{staticClass:"form-check-input list-checkbox",attrs:{id:"listCheckboxOne",type:"checkbox"}}),t._v(" "),a("label",{staticClass:"form-check-label",attrs:{for:"listCheckboxOne"}})])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("td",{staticClass:"text-end"},[a("div",{staticClass:"dropdown"},[a("a",{staticClass:"dropdown-ellipses dropdown-toggle",attrs:{href:"#",role:"button","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[a("i",{staticClass:"fe fe-more-vertical"})]),t._v(" "),a("div",{staticClass:"dropdown-menu dropdown-menu-end dropdown-fix"},[a("a",{staticClass:"disabled dropdown-item",attrs:{href:"#"}},[t._v(" Edit ")])])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",{staticClass:"list-pagination-prev pagination pagination-tabs card-pagination"},[a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link ps-0 pe-4 border-end",attrs:{href:"#"}},[a("i",{staticClass:"fe fe-arrow-left me-1"}),t._v(" Prev\n                          ")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",{staticClass:"list-pagination-next pagination pagination-tabs card-pagination"},[a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link ps-4 pe-0 border-start",attrs:{href:"#"}},[t._v("\n                              Next "),a("i",{staticClass:"fe fe-arrow-right ms-1"})])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"list-alert alert alert-dark alert-dismissible border fade",attrs:{role:"alert"}},[a("div",{staticClass:"row align-items-center"},[a("div",{staticClass:"col"},[a("div",{staticClass:"form-check"},[a("input",{staticClass:"form-check-input",attrs:{id:"listAlertCheckbox",type:"checkbox",checked:"",disabled:""}}),t._v(" "),a("label",{staticClass:"form-check-label text-white",attrs:{for:"listAlertCheckbox"}},[a("span",{staticClass:"list-alert-count"},[t._v("0")]),t._v(" posts(s)\n                                  ")])])]),t._v(" "),a("div",{staticClass:"col-auto me-n3"},[a("button",{staticClass:"btn btn-sm btn-white-20",attrs:{disabled:""}},[t._v(" Activate ")]),t._v(" "),a("button",{staticClass:"btn btn-sm btn-white-20",attrs:{disabled:""}},[t._v(" Deactivate ")])])]),t._v(" "),a("button",{staticClass:"list-alert-close btn-close",attrs:{type:"button","aria-label":"Close"}})])}],!1,null,null,null).exports}}]);