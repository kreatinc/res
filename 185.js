"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[185],{2652:(t,e,a)=>{a.r(e),a.d(e,{default:()=>i});function s(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var s,r,n=[],i=!0,l=!1;try{for(a=a.call(t);!(i=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(t){l=!0,r=t}finally{try{i||null==a.return||a.return()}finally{if(l)throw r}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return r(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,s=new Array(e);a<e;a++)s[a]=t[a];return s}const n={data:function(){return{loading:!1,reload:!0,msg:{errors:window.nerrors,success:window.nsuccess,warnings:window.nwarnings,infos:window.ninfos,footercontent:window.nfooterContent},user:window.nuelinkUser,plansStatics:[],partners:[],pagination:{},newpartner:{source:"pitchground",type:"lifetime",quantity:1},plans:[]}},created:function(){document.title="Nuelink - Posts Admin",this.getPartners(),this.getPlans()},computed:{},methods:{paginationUrl:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(t){var e=new URL(t),a=e&&e.searchParams.get("page")?e.searchParams.get("page"):1,s=new URL(window.location.href);return s.searchParams.set("page",a),s.href}},getPlans:function(){var t=this;axios.get("/api/admin/plans").then((function(e){t.plans=e.data.data})).catch((function(e){t.getPlans()}))},createPartner:function(){var t=this,e=this;this.loading=!0,axios.post("/api/admin/partners/generate",this.newpartner).then((function(a){e.getPartners(),t.loading=!1,$(".modal").modal("hide"),notyMsg({text:"The new coupon(s) was deleted successfully!",type:"success"})})).catch((function(e){t.loading=!1,notyMsg({text:e.response&&e.response.data&&e.response.error?e.response.error:"Something went wrong! we could not generate this new coupon(s)! please try again.",type:"error"})}))},deletePartner:function(t){var e=[t],a=this,s=notyDialog({text:"Are you sure you want to delete this partner?",buttons:[Noty.button("Yes, Delete","btn btn-danger",(function(){axios.post("/api/admin/partners/delete",{codes:e}).then((function(t){a.getPartners(),s.close(),notyMsg({text:"Partner was deleted successfully!",type:"success"})})).catch((function(t){notyMsg({text:t.response&&t.response.data&&t.response.error?t.response.error:"Something went wrong! we could not deleted this partner! please try again.",type:"error"})}))})),Noty.button("Cancel","btn btn-outline-secondary",(function(){s.close()}))]})},badgeType:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return"free"==t?'<span class="badge bg-primary-soft">'+t+"</span>":"lifetime"==t?'<span class="badge bg-warning-soft">'+t+"</span>":"unused"==t?'<span class="badge bg-primary">'+t+"</span>":"used"==t?'<span class="badge bg-info">'+t+"</span>":'<span class="badge bg-secondary-soft">'+t+"</span>"},getPartners:function(){var t=this,e="/api/admin/partners/status",a=new URL(window.location.href),r=a&&a.searchParams.get("page")?a.searchParams.get("page"):1;e="".concat(e,"?page=").concat(r),t.reload=!1,t.loading=!0,axios.get(e).then((function(e){var a,r,n;if(t.partners=null==e||null===(a=e.data)||void 0===a?void 0:a.data,t.plansStatics=(null==e||null===(r=e.data)||void 0===r?void 0:r.plans)||[],null!=e&&null!==(n=e.data)&&void 0!==n&&n.meta)for(var i=0,l=Object.entries(e.data.meta);i<l.length;i++){var o=s(l[i],2),c=o[0],d=o[1];t.pagination[c]=d}setTimeout((function(){t.reload=!0,setTimeout((function(){t.loading=!1,initList()}),300)}),50);try{$('[data-toggle="tooltip"]').tooltip()}catch(t){setTimeout((function(){$('[data-toggle="tooltip"]').tooltip()}),1e3)}})).catch((function(e){t.reload=!0,t.loading=!1}))},dtFormat:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return window.dtFormat(t,e,a)}},mounted:function(){}};const i=(0,a(1900).Z)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid",class:{loading:t.loading}},[a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"header"},[a("div",{staticClass:"header-body"},[a("div",{staticClass:"row align-items-center"},[t._m(0),t._v(" "),a("div",{staticClass:"col-auto"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button","data-bs-toggle":"modal","data-bs-target":"#modalCreatePartner"},on:{click:function(e){t.newpartner={source:"pitchground",type:"lifetime",quantity:1}}}},[t._v("\n                            Generate Coupons\n                        ")])])])])]),t._v(" "),t.msg.success?a("div",{staticClass:"alert alert-success mb-4"},[t._v(" "+t._s(t.msg.success)+" ")]):t._e(),t._v(" "),t._l(t.msg.warnings,(function(e){return a("div",{key:e,staticClass:"alert alert-warning mb-4",domProps:{innerHTML:t._s(e)}})})),t._v(" "),t._l(t.msg.errors,(function(e){return a("div",{key:e,staticClass:"alert alert-danger mb-4",attrs:{role:"alert"}},[t._v(" "+t._s(e)+" ")])})),t._v(" "),t._l(t.msg.infos,(function(e){return a("div",{key:e,domProps:{innerHTML:t._s(e)}})})),t._v(" "),a("div",{staticClass:"row row-sm"},t._l(t.plansStatics,(function(e){return a("div",{staticClass:"col-md"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h6",{staticClass:"text-uppercase text-muted mb-2"},[t._v(" "+t._s(e.name)+" ")]),t._v(" "),a("span",{staticClass:"h2 mb-0"},[t._v(t._s(e.total?e.total:0))]),t._v(" "),a("small",{staticClass:"text-muted"},[t._v("("+t._s(e.used?e.used:0)+" used)")])])])])})),0),t._v(" "),t.reload?a("div",{staticClass:"card",attrs:{"data-list":'{"valueNames": ["item-code", "item-userid", "item-plan", "item-source", "item-discount", "item-label", "item-type", "item-status",  "item-email"], "page": 50, "pagination": {"paginationClass": "list-pagination"} }',id:"partners"}},[t._m(1),t._v(" "),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-sm table-hover table-nowrap card-table table-valign-middle"},[t.partners&&t.partners.length>0?a("thead",[t._m(2)]):t._e(),t._v(" "),a("tbody",{staticClass:"list fs-base"},[!t.partners||t.partners&&t.partners.length<1?a("tr",[a("td",{staticClass:"fs-2 text-center text-muted"},[t._v("All partners will appear here.")])]):t._e(),t._v(" "),t._l(t.partners,(function(e,s){return a("tr",{key:s},[t._m(3,!0),t._v(" "),a("td",{staticClass:"item-code"},[t._v(t._s(e.code))]),t._v(" "),a("td",{staticClass:"item-plan"},[t._v(t._s(e.plan))]),t._v(" "),a("td",{staticClass:"item-discount"},[t._v(t._s(e.discount?e.discount:0))]),t._v(" "),a("td",{staticClass:"item-type",domProps:{innerHTML:t._s(t.badgeType(e.type))}}),t._v(" "),a("td",{staticClass:"item-status",domProps:{innerHTML:t._s(t.badgeType(e.status))}}),t._v(" "),a("td",{staticClass:"item-label"},[t._v(t._s(e.label))]),t._v(" "),a("td",{staticClass:"item-userid"},[t._v(t._s(e.userid))]),t._v(" "),a("td",{staticClass:"item-email"},[t._v(t._s(e.email))]),t._v(" "),a("td",{staticClass:"item-source"},[t._v(t._s(e.source))]),t._v(" "),a("td",{staticClass:"text-end"},[a("div",{staticClass:"dropdown"},[t._m(4,!0),t._v(" "),a("div",{staticClass:"dropdown-menu dropdown-menu-end dropdown-fix"},[a("a",{staticClass:"dropdown-item",attrs:{href:"#"},on:{click:function(a){return t.deletePartner(e.code)}}},[t._v(" Delete ")])])])])])}))],2)])]),t._v(" "),t.partners&&t.partners.length>0?a("div",{class:{"card-footer d-flex justify-content-center":t.pagination.total>parseInt(t.pagination.per_page)}},[t.pagination&&t.partners&&t.pagination.total>parseInt(t.pagination.per_page)?a("nav",{attrs:{"aria-label":"navigation"}},[a("ul",{staticClass:"pagination"},t._l(t.pagination.links,(function(e,s){return a("li",{key:s,staticClass:"page-item",class:e.active?"active":""},[a("a",{staticClass:"page-link",class:!e.url||e.active?"disabled opacity-50":"",attrs:{href:t.paginationUrl(e.url)},domProps:{innerHTML:t._s(e.page||e.label||s+1)}})])})),0)]):t._e(),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"list-pagination pagination pagination-tabs card-pagination"}),t._v(" "),t._m(5)]):t._e()]):t._e()],2)]),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"modalCreatePartner",tabindex:"-1",role:"dialog","aria-hidden":"true","data-bs-backdrop":"static","data-bs-keyboard":"false"}},[a("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[a("div",{staticClass:"modal-content bg-lighter"},[a("div",{staticClass:"card-header"},[a("h3",{staticClass:"card-header-title"},[t._v(" Generate Coupons ")]),t._v(" "),a("button",{staticClass:"btn-close",attrs:{type:"button","data-bs-dismiss":"modal","aria-label":"Close"},on:{click:function(e){t.newPlan={sAutomations:[],sChannels:[],isActive:!1}}}})]),t._v(" "),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"planNameCC"}},[t._v("Plan")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.newpartner.plan,expression:"newpartner.plan"}],staticClass:"form-select",attrs:{name:"plan",id:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.newpartner,"plan",e.target.multiple?a:a[0])}}},t._l(t.plans,(function(e){return a("option",{key:e.name,domProps:{value:e.name}},[t._v(t._s(e.name))])})),0)]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"type"}},[t._v("Type")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.newpartner.type,expression:"newpartner.type"}],staticClass:"form-select",attrs:{name:"plan",id:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.newpartner,"type",e.target.multiple?a:a[0])}}},t._l(["free","lifetime"],(function(e){return a("option",{key:e,domProps:{value:e}},[t._v(t._s(e))])})),0)]),t._v(" "),a("div",{staticClass:"col-sm form-group"},[a("label",{attrs:{for:"quantity"}},[t._v("Quantity")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newpartner.quantity,expression:"newpartner.quantity"}],staticClass:"form-control",attrs:{type:"number",id:"quantity",placeholder:"1",required:""},domProps:{value:t.newpartner.quantity},on:{input:function(e){e.target.composing||t.$set(t.newpartner,"quantity",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-sm form-group"},[a("label",{attrs:{for:"label"}},[t._v("Label")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newpartner.label,expression:"newpartner.label"}],staticClass:"form-control",attrs:{type:"text",id:"label",placeholder:"coupon",required:""},domProps:{value:t.newpartner.label},on:{input:function(e){e.target.composing||t.$set(t.newpartner,"label",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-sm form-group"},[a("label",{attrs:{for:"source"}},[t._v("Source")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newpartner.source,expression:"newpartner.source"}],staticClass:"disabled bg-light form-control",attrs:{type:"number",disabled:"",id:"source",placeholder:"pitchground",required:""},domProps:{value:t.newpartner.source},on:{input:function(e){e.target.composing||t.$set(t.newpartner,"source",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"mt-5"},[a("button",{staticClass:"btn btn-primary",attrs:{disabled:!t.newpartner.plan},on:{click:function(e){return t.createPartner()}}},[t._v("Create Coupon")]),t._v(" "),a("button",{staticClass:"btn btn-light ml-2",attrs:{"data-bs-dismiss":"modal"},on:{click:function(e){t.newpartner={source:"pitchground",type:"lifetime",quantity:1}}}},[t._v("Close")])])])])])])])}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col"},[a("h6",{staticClass:"header-pretitle"},[t._v("\n                              Admin\n                          ")]),t._v(" "),a("h1",{staticClass:"header-title"},[t._v(" Partners ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-header"},[a("div",{staticClass:"row align-items-center"},[a("div",{staticClass:"col"},[a("form",{staticClass:"mb-0"},[a("div",{staticClass:"input-group input-group-flush input-group-merge input-group-reverse"},[a("input",{staticClass:"form-control list-search",attrs:{type:"search",placeholder:"Search"}}),t._v(" "),a("span",{staticClass:"input-group-text"},[a("i",{staticClass:"fe fe-search"})])])])]),t._v(" "),a("div",{staticClass:"col-auto me-n3",attrs:{hidden:""}},[a("form",{staticClass:"mb-0"},[a("select",{staticClass:"form-select form-select-sm form-control-flush list-page",attrs:{"data-choices":"{'searchEnabled': false}"}},[a("option",{attrs:{value:"25",selected:""}},[t._v("25 per page")]),t._v(" "),a("option",{attrs:{value:"50"}},[t._v("50 per page")]),t._v(" "),a("option",{attrs:{value:"100"}},[t._v("100 per page")])])])]),t._v(" "),a("div",{staticClass:"col-auto",attrs:{hidden:""}},[a("div",{staticClass:"dropdown"},[a("button",{staticClass:"btn btn-sm btn-white",attrs:{type:"button","data-bs-toggle":"dropdown","data-bs-auto-close":"outside","aria-haspopup":"true","aria-expanded":"false"}},[a("i",{staticClass:"fe fe-sliders me-1"}),t._v(" Filter "),a("span",{staticClass:"badge bg-primary ms-1 list-filter-number"})]),t._v(" "),a("form",{staticClass:"dropdown-menu dropdown-menu-end dropdown-menu-card"},[a("div",{staticClass:"card-header"},[a("h4",{staticClass:"card-header-title"},[t._v("\n                                        Filters\n                                      ")]),t._v(" "),a("button",{staticClass:"btn btn-sm btn-link text-reset",attrs:{type:"reset"}},[a("small",[t._v("Clear filters")])])]),t._v(" "),a("div",{staticClass:"card-body"},[a("div",{staticClass:"list-group list-group-flush mt-n4 mb-4"},[a("div",{staticClass:"list-group-item"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("small",[t._v("Plan")])]),t._v(" "),a("div",{staticClass:"col-auto"},[a("select",{staticClass:"form-select form-select-sm",attrs:{"data-filter":"item-plan","data-choices":'{"searchEnabled": false}'}},[a("option",{attrs:{value:"*",selected:""}},[t._v("Any")]),t._v(" "),a("option",{attrs:{value:"FREE"}},[t._v("Free")]),t._v(" "),a("option",{attrs:{value:"STANDARD"}},[t._v("Standard")]),t._v(" "),a("option",{attrs:{value:"PREMIUM"}},[t._v("Premium")])])])])]),t._v(" "),a("div",{staticClass:"list-group-item"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("small",[t._v("Status")])]),t._v(" "),a("div",{staticClass:"col-auto"},[a("select",{staticClass:"form-select form-select-sm",attrs:{"data-filter":"item-status","data-choices":'{"searchEnabled": false}'}},[a("option",{attrs:{value:"*",selected:""}},[t._v("Any")]),t._v(" "),a("option",{attrs:{value:"Active"}},[t._v("Active")]),t._v(" "),a("option",{attrs:{value:"Inactive"}},[t._v("Inactive")])])])])])]),t._v(" "),a("button",{staticClass:"btn w-100 btn-primary list-filter-submit",attrs:{type:"button"}},[t._v("\n                                          Apply filter\n                                      ")])])])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",[a("div",{staticClass:"form-check mb-n2"},[a("input",{staticClass:"form-check-input list-checkbox-all",attrs:{id:"listCheckboxAll",type:"checkbox"}}),t._v(" "),a("label",{staticClass:"form-check-label",attrs:{for:"listCheckboxAll"}})])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-code",href:"#"}},[t._v("Code")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-plan",href:"#"}},[t._v("plan")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-discount",href:"#"}},[t._v("discount")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-type",href:"#"}},[t._v("type")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-status",href:"#"}},[t._v("status")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-label",href:"#"}},[t._v("Label")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-userid",href:"#"}},[t._v("user")])]),t._v(" "),a("th",[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-email",href:"#"}},[t._v("email")])]),t._v(" "),a("th",{attrs:{colspan:"2"}},[a("a",{staticClass:"list-sort text-muted",attrs:{"data-sort":"item-source",href:"#"}},[t._v("source")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",[a("div",{staticClass:"form-check"},[a("input",{staticClass:"form-check-input list-checkbox",attrs:{id:"listCheckboxOne",type:"checkbox"}}),t._v(" "),a("label",{staticClass:"form-check-label",attrs:{for:"listCheckboxOne"}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"dropdown-ellipses dropdown-toggle",attrs:{href:"#",role:"button","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[e("i",{staticClass:"fe fe-more-vertical"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"list-alert alert alert-dark alert-dismissible border fade",attrs:{role:"alert"}},[a("div",{staticClass:"row align-items-center"},[a("div",{staticClass:"col"},[a("div",{staticClass:"form-check"},[a("input",{staticClass:"form-check-input",attrs:{id:"listAlertCheckbox",type:"checkbox",checked:"",disabled:""}}),t._v(" "),a("label",{staticClass:"form-check-label text-white",attrs:{for:"listAlertCheckbox"}},[a("span",{staticClass:"list-alert-count"},[t._v("0")]),t._v(" partner(s)\n                                ")])])]),t._v(" "),a("div",{staticClass:"col-auto me-n3"},[a("button",{staticClass:"btn btn-sm btn-white-20",attrs:{disabled:""}},[t._v(" Delete Selected Partener(s)")])])]),t._v(" "),a("button",{staticClass:"list-alert-close btn-close",attrs:{type:"button","aria-label":"Close"}})])}],!1,null,null,null).exports}}]);