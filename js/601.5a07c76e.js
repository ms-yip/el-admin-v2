"use strict";(self["webpackChunkel_admin_v2"]=self["webpackChunkel_admin_v2"]||[]).push([[601],{2601:function(e,t,s){s.r(t),s.d(t,{default:function(){return r}});var i=function(){var e=this,t=e._self._c;return t("el-dialog",{attrs:{title:e.$t("select"),"close-on-click-modal":!1,visible:e.visible},on:{close:e.closeHandle,"update:visible":function(t){e.visible=t}}},[t("div",{staticStyle:{"text-align":"center"}},[t("el-button",{staticStyle:{"margin-bottom":"20px"},on:{click:e.download}},[e._v("下载导入模板文件(Excel)")])],1),t("el-upload",{staticStyle:{"text-align":"center"},attrs:{drag:"",action:e.action,"before-upload":e.beforeUploadHandle,"on-success":e.successHandle,multiple:"","file-list":e.fileList,accept:e.acceptList}},[t("i",{staticClass:"el-icon-upload"}),t("div",{staticClass:"el-upload__text"},[e._v(" 将文件拖到此处，或 "),t("em",[e._v("点击导入")])]),t("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只支持导入excel文件！")])])],1)},l=[],a={props:{acceptList:{type:String,default:".xlsx,.xls"},importUrl:String},data(){return{visible:!1,url:"",num:0,successNum:0,fileList:[],query:"",fileUploadPath:"",fileName:""}},computed:{dataObj(){return{tellerId:this.$store.state.user.account,optUser:this.$store.state.user.name,fileName:this.fileName,filePath:this.fileUploadPath,language:"zh"===this.$store.state.i18n.locale?"zh_CN":"en_us"}},action(){return"/api/SystemFileUploadServlet?path="+this.fileUploadPath}},methods:{init(){this.visible=!0,this.$http({url:"/service/user/getTemplateFile",method:"post",data:{language:"zh"===this.$store.state.i18n.locale?"zh_CN":"en_us"},contentType:"json"}).then((e=>{this.query="fileName="+e.data.fileName+"&filePath="+e.data.filePath,this.fileUploadPath=e.data.fileUploadPath,this.fileUploadPath.replace(/\\/g,"/"),this.fileName=e.data.fileName,console.log(this.query),e&&0===e.code?console.log():this.$message(this.$t(e.msg))}))},download(){window.location.href="/api//service/systemfile/downloadFile?"+this.query},beforeUploadHandle(e){if("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"!==e.type&&"application/vnd.ms-excel"!==e.type)return this.$message.error("只支持上传excel文件！"),!1;this.num++},successHandle(e,t,s){this.fileList=s,this.successNum++,this.$http({url:"/service/user/import",method:"post",data:this.dataObj,contentType:"json"}).then((e=>{e&&0===e.code?this.num===this.successNum&&this.$confirm("操作成功, 是否继续操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((()=>{this.visible=!1})):this.$message(this.$t(e.msg))}))},closeHandle(){this.fileList=[],this.$emit("refreshDataList")}}},o=a,n=s(3736),c=(0,n.Z)(o,i,l,!1,null,"c9627798",null),r=c.exports}}]);
//# sourceMappingURL=601.5a07c76e.js.map