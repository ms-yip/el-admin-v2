"use strict";(self["webpackChunkel_admin_v2"]=self["webpackChunkel_admin_v2"]||[]).push([[203],{5203:function(t,e,s){s.r(e),s.d(e,{default:function(){return r}});var a=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"CommonDataSettingModule"}},[e("el-row",[e("div",{staticClass:"settingModule"},[e("label",[t._v("时间设置")]),e("el-input",{staticStyle:{width:"100px"},attrs:{maxlength:25},model:{value:t.eventPassTime,callback:function(e){t.eventPassTime=e},expression:"eventPassTime"}}),e("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("提交")])],1)])],1)},n=[],i={name:"CommonDataSettingModule",components:{},mixins:[],props:{},data(){return{eventPassTime:""}},computed:{},created(){},mounted(){this.getData()},methods:{getData(){let t={};t={language:"zh"===this.$store.state.i18n.locale?"zh_CN":"en_us"},this.$http({url:"/getSetting",method:"post",data:t,contentType:"json"}).then((t=>{t&&0===t.code?this.eventPassTime=t.data.eventPassTime:this.$message.error(this.$t(t.msg))}))},dataFormSubmit(){let t={};t={language:"zh"===this.$store.state.i18n.locale?"zh_CN":"en_us",eventPassTime:this.eventPassTime},this.$http({url:"/setting",method:"post",data:t,contentType:"json"}).then((t=>{t&&0===t.code?this.$message({message:this.$t("info.common.operation"),type:"success",duration:1500,onClose:()=>{}}):this.$message.error(this.$t(t.msg))}))}},filters:{},watch:{}},o=i,l=s(3736),m=(0,l.Z)(o,a,n,!1,null,"9ddcd53c",null),r=m.exports}}]);
//# sourceMappingURL=203.b385528b.js.map