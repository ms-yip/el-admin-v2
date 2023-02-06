"use strict";(self["webpackChunkel_admin_v2"]=self["webpackChunkel_admin_v2"]||[]).push([[919],{5970:function(e,t,a){a.d(t,{Z:function(){return m}});var s,o,l={methods:{refreshUserData(e){this.$http.get("/service/loginData/refreshUserData",{params:{language:"zh"===this.$store.state.i18n.locale?"zh_CN":"en_us",refreshDataType:e}}).then((t=>{if(0===t.code){let a=[];switch(e){case"events":break;case"datas":this.$store.commit("common/updateDictList",t.data);break;case"privileges":this.$store.commit("common/updatePermissions",t.data);break;case"menus":this.$router.options.hasAddDynamicMenuRoutes=!1,console.log(this.$router.options.hasAddDynamicMenuRoutes),this.$store.commit("common/updateAllMenuList",t.data),a=this.$store.getters["common/menuRoutersList"].map((e=>{const t=e.urlVue.startsWith("/")?e.urlVue:`/${e.urlVue}`;return{path:t,meta:{nameEnUs:e.nameEnUs,nameLocal:e.nameLocal},component:null}})),this.$store.commit("common/updateBusiRouters",[...a]);break;case"languages":this.$i18n.mergeLocaleMessage("zh",t.data.languages);break}}}))}},filters:{},watch:{}},r=l,i=a(3736),n=(0,i.Z)(r,s,o,!1,null,null,null),m=n.exports},5919:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var s=function(){var e=this,t=e._self._c;return t("el-dialog",{attrs:{title:e.dataForm.id?"编辑":"新增",visible:e.visible},on:{"update:visible":function(t){e.visible=t},close:e.resetDataForm}},[t("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"150px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.dataFormSubmit()}}},[t("el-form-item",{attrs:{label:e.$t("英文"),prop:"nameEnUs"}},[t("el-input",{attrs:{maxlength:25},model:{value:e.dataForm.nameEnUs,callback:function(t){e.$set(e.dataForm,"nameEnUs",t)},expression:"dataForm.nameEnUs"}})],1),t("el-form-item",{attrs:{label:e.$t("中文"),prop:"nameLocal"}},[t("el-input",{attrs:{maxlength:25},model:{value:e.dataForm.nameLocal,callback:function(t){e.$set(e.dataForm,"nameLocal",t)},expression:"dataForm.nameLocal"}})],1),t("el-form-item",{attrs:{label:e.$t("父级"),prop:"parentName"}},[t("el-select",{attrs:{size:"mini"},model:{value:e.dataForm.parentName,callback:function(t){e.$set(e.dataForm,"parentName",t)},expression:"dataForm.parentName"}},[t("el-option",{attrs:{value:e.dataForm.parentName}},[t("el-tree",{attrs:{data:e.menuList,props:e.defaultProps,accordion:""},on:{"node-click":e.handleNodeClick}})],1)],1)],1),t("el-form-item",{attrs:{label:e.$t("类型"),prop:"moduleType"}},[t("el-select",{attrs:{size:"mini",disabled:e.editable},model:{value:e.dataForm.moduleType,callback:function(t){e.$set(e.dataForm,"moduleType",t)},expression:"dataForm.moduleType"}},e._l(e.typeList,(function(e){return t("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:e.$t("icon"),prop:"iconUrl"}},[t("el-input",{attrs:{maxlength:25},model:{value:e.dataForm.iconUrl,callback:function(t){e.$set(e.dataForm,"iconUrl",t)},expression:"dataForm.iconUrl"}})],1),t("el-form-item",{attrs:{label:e.$t("url"),prop:"url"}},[t("el-input",{attrs:{maxlength:25},model:{value:e.dataForm.url,callback:function(t){e.$set(e.dataForm,"url",t)},expression:"dataForm.url"}})],1),t("el-form-item",{attrs:{label:e.$t("备注"),prop:"memo"}},[t("el-input",{attrs:{maxlength:25},model:{value:e.dataForm.memo,callback:function(t){e.$set(e.dataForm,"memo",t)},expression:"dataForm.memo"}})],1),t("el-form-item",{attrs:{label:e.$t("标志"),prop:"flag"}},[t("el-select",{attrs:{size:"mini"},model:{value:e.dataForm.flag,callback:function(t){e.$set(e.dataForm,"flag",t)},expression:"dataForm.flag"}},e._l(e.statusList,(function(e){return t("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1)],1),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),t("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"primary"},on:{click:function(t){return e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},o=[],l=a(5970),r={components:{},mixins:[l.Z],props:{},data(){return{menuList:[],statusList:this.$store.getters["getDictList"]("dept.status"),typeList:this.$store.getters["getDictList"]("dept.status"),visible:!1,fullscreenLoading:!1,clickStatu:!1,editable:!1,type:"",dataForm:{parentId:"",code:"",nameEnUs:"",nameLocal:"",id:"",name:"",moduleIndex:"",moduleType:"0",flag:"1",memo:"",url:"",urlVue:"",iconUrl:"",moduleLevel:1,parentName:""},parentLabel:"",defaultProps:{children:"children",label:"name"},dataRule:{code:[{required:!0,message:this.$t("sys.menu.code")+this.$t("info.common.notNull "),trigger:"blur"}],nameEnUs:[{required:!0,message:this.$t("sys.menu.nameEnUs")+this.$t("info.common.notNull "),trigger:"blur"}],nameLocal:[{required:!0,message:this.$t("sys.menu.nameLocal")+this.$t("info.common.notNull "),trigger:"blur"}]}}},computed:{},created(){},mounted(){this.getMenuList()},methods:{init(e,t){this.type="",this.visible=!0,this.disabled=!1,console.log(e),this.$nextTick((()=>{this.$refs.dataForm.resetFields(),e&&(e.moduleType=String(e.moduleType),this.dataForm=e||"","copy"===t&&(this.dataForm.id=null))}))},resetDataForm(){this.dataForm={parentId:"",code:"",nameEnUs:"",nameLocal:"",id:"",name:"",moduleIndex:"",moduleType:"0",flag:"1",memo:"",url:"",urlVue:"",iconUrl:"",moduleLevel:1,parentName:""}},getMenuList(){this.$http.get("/service/module/getTree/"+("zh"===this.$store.state.i18n.locale?"zh_CN":"en_us")).then((e=>{0===e.code?this.menuList=e.data:this.$message(this.$t(e.msg))}))},handleNodeClick(e){this.dataForm.parentId=e.id,this.dataForm.parentName=e.name,this.dataForm.moduleLevel=e.moduleLevel+1,console.log(e)},dataFormSubmit(){this.clickStatu||(this.clickStatu=!0,this.$refs["dataForm"].validate((e=>{if(e){this.fullscreenLoading=!0;let e={};e={id:this.dataForm.id||"",code:this.dataForm.code,nameLocal:this.dataForm.nameLocal,nameEnUs:this.dataForm.nameEnUs,parentId:this.dataForm.parentId,parentName:this.dataForm.parentName,moduleIndex:this.dataForm.moduleIndex,moduleType:this.dataForm.moduleType,flag:this.dataForm.flag,memo:this.dataForm.memo,moduleLevel:this.dataForm.moduleLevel,url:this.dataForm.url,urlVue:this.dataForm.urlVue,iconUrl:this.dataForm.iconUrl,language:"zh"===this.$store.state.i18n.locale?"zh_CN":"en_us"},this.$http({url:"/service/module/save",method:"post",data:e,contentType:"json"}).then((e=>{e&&0===e.code?(this.refreshUserData("menus"),this.visible=!1,this.$emit("refreshDataList"),this.$message({message:this.$t("operateSuccess"),type:"success",duration:1500,onClose:()=>{this.clickStatu=!1,this.fullscreenLoading=!1}})):this.$message({message:this.$t(e.msg),type:"error",duration:1500,onClose:()=>{this.clickStatu=!1,this.fullscreenLoading=!1}})}))}}))),setTimeout((()=>{this.clickStatu=!1,this.fullscreenLoading=!1}),1500)}},filters:{},watch:{}},i=r,n=a(3736),m=(0,n.Z)(i,s,o,!1,null,"2a022c4a",null),u=m.exports}}]);
//# sourceMappingURL=919.d9965919.js.map