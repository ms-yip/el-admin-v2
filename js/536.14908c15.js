"use strict";(self["webpackChunkel_admin_v2"]=self["webpackChunkel_admin_v2"]||[]).push([[536,331],{5970:function(e,t,a){a.d(t,{Z:function(){return m}});var s,i,o={methods:{refreshUserData(e){this.$http.get("/service/loginData/refreshUserData",{params:{language:"zh"===this.$store.state.i18n.locale?"zh_CN":"en_us",refreshDataType:e}}).then((t=>{if(0===t.code){let a=[];switch(e){case"events":break;case"datas":this.$store.commit("common/updateDictList",t.data);break;case"privileges":this.$store.commit("common/updatePermissions",t.data);break;case"menus":this.$router.options.hasAddDynamicMenuRoutes=!1,console.log(this.$router.options.hasAddDynamicMenuRoutes),this.$store.commit("common/updateAllMenuList",t.data),a=this.$store.getters["common/menuRoutersList"].map((e=>{const t=e.urlVue.startsWith("/")?e.urlVue:`/${e.urlVue}`;return{path:t,meta:{nameEnUs:e.nameEnUs,nameLocal:e.nameLocal},component:null}})),this.$store.commit("common/updateBusiRouters",[...a]);break;case"languages":this.$i18n.mergeLocaleMessage("zh",t.data.languages);break}}}))}},filters:{},watch:{}},n=o,l=a(3736),r=(0,l.Z)(n,s,i,!1,null,null,null),m=r.exports},9331:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var s=function(){var e=this,t=e._self._c;return t("el-dialog",{attrs:{title:e.dataForm.id?"编辑":"新增",visible:e.visible},on:{"update:visible":function(t){e.visible=t},close:e.resetDataForm}},[t("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"150px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.dataFormSubmit()}}},[t("el-form-item",{attrs:{label:e.$t("编码"),prop:"code"}},[t("el-input",{attrs:{maxlength:25},model:{value:e.dataForm.code,callback:function(t){e.$set(e.dataForm,"code",t)},expression:"dataForm.code"}})],1),t("el-form-item",{attrs:{label:e.$t("英文"),prop:"nameEnUs"}},[t("el-input",{attrs:{maxlength:25},model:{value:e.dataForm.nameEnUs,callback:function(t){e.$set(e.dataForm,"nameEnUs",t)},expression:"dataForm.nameEnUs"}})],1),t("el-form-item",{attrs:{label:e.$t("中文"),prop:"nameLocal"}},[t("el-input",{attrs:{maxlength:25},model:{value:e.dataForm.nameLocal,callback:function(t){e.$set(e.dataForm,"nameLocal",t)},expression:"dataForm.nameLocal"}})],1),t("el-form-item",{attrs:{label:e.$t("备注"),prop:"memo"}},[t("el-input",{attrs:{maxlength:25},model:{value:e.dataForm.memo,callback:function(t){e.$set(e.dataForm,"memo",t)},expression:"dataForm.memo"}})],1)],1),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),t("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"primary"},on:{click:function(t){return e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},i=[],o=a(5970),n={components:{},mixins:[o.Z],props:{},data(){return{visible:!1,fullscreenLoading:!1,clickStatu:!1,dataForm:{code:"",nameEnUs:"",nameLocal:"",memo:""},dataRule:{code:[{required:!0,message:this.$t("sys.lang.code")+this.$t("info.common.notNull "),trigger:"blur"}],nameEnUs:[{required:!0,message:this.$t("sys.lang.nameEnUs")+this.$t("info.common.notNull "),trigger:"blur"}],nameLocal:[{required:!0,message:this.$t("sys.lang.nameLocal")+this.$t("info.common.notNull "),trigger:"blur"}]}}},computed:{},created(){},mounted(){},methods:{init(e,t){this.visible=!0,console.log(e),this.$nextTick((()=>{this.$refs.dataForm.resetFields(),e&&(this.dataForm=e||"","copy"===t&&(this.dataForm.id=null))}))},resetDataForm(){this.dataForm={code:"",nameEnUs:"",nameLocal:"",memo:""}},dataFormSubmit(){this.clickStatu||(this.clickStatu=!0,this.$refs["dataForm"].validate((e=>{if(e){this.fullscreenLoading=!0;let e={};e={id:this.dataForm.id||null,code:this.dataForm.code,nameLocal:this.dataForm.nameLocal,nameEnUs:this.dataForm.nameEnUs,memo:this.dataForm.memo,language:"zh"===this.$store.state.i18n.locale?"zh_CN":"en_us"},this.$http({url:"/service/language/save",method:"post",data:e,contentType:"json"}).then((e=>{this.refreshUserData("languages"),e&&0===e.code?(this.visible=!1,this.$emit("refreshDataList"),this.$message({message:this.$t("operateSuccess"),type:"success",duration:1500,onClose:()=>{this.clickStatu=!1,this.fullscreenLoading=!1}})):this.$message({message:this.$t(e.msg),type:"error",duration:1500,onClose:()=>{this.clickStatu=!1,this.fullscreenLoading=!1}})}))}}))),setTimeout((()=>{this.clickStatu=!1,this.fullscreenLoading=!1}),1500)}},filters:{},watch:{}},l=n,r=a(3736),m=(0,r.Z)(l,s,i,!1,null,"3de635b1",null),c=m.exports},2536:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var s=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"I18nList"}},[t("grid",{ref:"I18n",attrs:{api:e.api,model:e.dataForm,columns:e.columns,method:"post",requestOption:{contentType:"json"},rowKey:"id",multiSelectedArr:e.multipleSelection,requestCallback:e.requestCallback},on:{"update:multiSelectedArr":function(t){e.multipleSelection=t},"update:multi-selected-arr":function(t){e.multipleSelection=t}}},[t("div",{attrs:{slot:"form"},slot:"form"},[t("el-form-item",{attrs:{label:this.$t("编码")}},[t("el-input",{attrs:{placeholder:this.$t("编码"),clearable:""},model:{value:e.dataForm.code,callback:function(t){e.$set(e.dataForm,"code",t)},expression:"dataForm.code"}})],1),t("el-form-item",{attrs:{label:this.$t("名称")}},[t("el-input",{attrs:{placeholder:this.$t("名称"),clearable:""},model:{value:e.dataForm.name,callback:function(t){e.$set(e.dataForm,"name",t)},expression:"dataForm.name"}})],1)],1),t("btn-list",{attrs:{slot:"toolbar",data:e.btnList},on:{click:e.action},slot:"toolbar"})],1),e.addOrUpdateVisible?t("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.refresh}}):e._e()],1)},i=[],o=a(9331),n={name:"I18nList",components:{AddOrUpdate:o["default"]},mixins:[],props:{},data(){return{api:"/service/language",addOrUpdateVisible:!1,multipleSelection:[],dataForm:{code:"",name:""},columns:[{type:"selection",align:"center",width:"50"},{label:"编码",prop:"code",align:"center"},{label:"中文",prop:"nameEnUs",align:"center"},{label:"英文",prop:"nameLocal",align:"center"},{label:"备注",prop:"memo",align:"center"}]}},computed:{btnList(){return this.$store.getters.getPermissionsByCode("management.sysI18n")}},created(){},mounted(){},methods:{action(e){const t=!(!e||!this[e]);t?this[e]():this.$message("该功能暂未支持,请联系管理员确认配置是否出错！")},add(){this.addOrUpdateVisible=!0,this.$nextTick((()=>{this.$refs.addOrUpdate.init()}))},edit(){if(0===this.multipleSelection.length)this.$message({message:this.$t("info.common.selectmore"),type:"warning",duration:1500});else if(1===this.multipleSelection.length){this.addOrUpdateVisible=!0;let e={};this.$refs.I18n.list.forEach((t=>{t.id===this.multipleSelection[0].id&&(e=JSON.parse(JSON.stringify(t)))})),console.log(e),this.$nextTick((()=>{this.$refs.addOrUpdate.init(e)}))}else this.$message({message:this.$t("info.common.selectone"),type:"warning",duration:1500})},copy(){if(0===this.multipleSelection.length&&this.$message({message:this.$t("info.common.selectmore"),type:"warning",duration:1500}),1===this.multipleSelection.length){this.addOrUpdateVisible=!0;let e={};this.$refs.I18n.list.forEach((t=>{t.id===this.multipleSelection[0].id&&(e=JSON.parse(JSON.stringify(t)))})),console.log(e),this.$nextTick((()=>{this.$refs.addOrUpdate.init(e,"copy")}))}else this.$message({message:this.$t("info.common.selectone"),type:"warning",duration:1500})},exportData(){},resetpassword(){},setgroup(){},importUserInfo(){},requestCallback(e,t){t&&0===t.code&&(e.list=t.data.result,e.totalCount=t.data.totalCount)},refresh(){this.$refs.I18n.getDataList()},del(e){var t=e?[e]:this.multipleSelection.map((e=>e.id));let a={};a={ids:t,language:"zh"===this.$store.state.i18n.locale?"zh_CN":"en_us"},this.$confirm(this.$t("info.common.delete"),this.$t("提示")).then((()=>{this.$http({url:"/service/language/del",method:"post",data:a,contentType:"json"}).then((e=>{e&&0===e.code?(this.refresh(),this.$message({message:this.$t("info.common.deletesuccess"),type:"success",duration:1500,onClose:()=>{}})):this.$message.error(this.$t(e.msg))}))}))}},filters:{},watch:{}},l=n,r=a(3736),m=(0,r.Z)(l,s,i,!1,null,"3b73c52b",null),c=m.exports}}]);
//# sourceMappingURL=536.14908c15.js.map