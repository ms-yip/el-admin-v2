<template>
  <el-dialog
    :title="$t('select')"
    :close-on-click-modal="false"
    @close="closeHandle"
    :visible.sync="visible"
  >
    <div style="text-align: center">
      <el-button style="margin-bottom: 20px" @click="download">下载导入模板文件(Excel)</el-button>
    </div>
    <el-upload
      drag
      :action="action"
      :before-upload="beforeUploadHandle"
      :on-success="successHandle"
      multiple
      :file-list="fileList"
      :accept="acceptList"
      style="text-align: center;"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击导入</em>
      </div>
      <div class="el-upload__tip" slot="tip">只支持导入excel文件！</div>
    </el-upload>
  </el-dialog>
</template>

<script>
export default {
  props: {
    acceptList: {
      type: String,
      default: '.xlsx,.xls'
    },
    importUrl: String
  },
  data () {
    return {
      visible: false,
      url: '',
      num: 0,
      successNum: 0,
      fileList: [],
      query: '',
      fileUploadPath: '',
      fileName: ''
    }
  },
  computed: {
    dataObj () {
      return {
        tellerId: this.$store.state.user.account,
        optUser: this.$store.state.user.name,
        fileName: this.fileName,
        filePath: this.fileUploadPath,
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
      }
    },
    action () {
      return '/api/SystemFileUploadServlet?' + 'path=' + this.fileUploadPath
      // /api//SystemFileUploadServlet?path=/home/feel/api4SH/apache-tomcat-6.0.53/webapps/api//file/import/upload/1623394964347/
    }
  },
  methods: {
    init () {
      this.visible = true
      this.$http({
        url: '/service/user/getTemplateFile',
        method: 'post',
        data: { language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us' },
        contentType: 'json'
      }).then((res) => {
        this.query =
          'fileName=' + res.data.fileName + '&' +
          'filePath=' + res.data.filePath
        this.fileUploadPath = res.data.fileUploadPath
        this.fileUploadPath.replace(/\\/g, '/')
        this.fileName = res.data.fileName
        console.log(this.query)
        if (res && res.code === 0) {
          console.log()
        } else {
          this.$message(this.$t(res.msg))
        }
      })
    },
    download () {
      window.location.href =
        '/api//service/systemfile/downloadFile?' + this.query
    // '/api//service/systemfile/downloadFile?fileName=UserInfoTemplate.xls&filePath=/home/feel/api4SH/apache-tomcat-6.0.53/webapps/api//file/import/template/'
    },
    // 上传之前
    beforeUploadHandle (file) {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.type !== 'application/vnd.ms-excel') {
        this.$message.error('只支持上传excel文件！')
        return false
      }
      this.num++
    },
    // 上传成功
    successHandle (response, file, fileList) {
      this.fileList = fileList
      this.successNum++
      this.$http({
        url: '/service/user/import',
        method: 'post',
        data: this.dataObj,
        contentType: 'json'
      }).then((res) => {
        if (res && res.code === 0) {
          if (this.num === this.successNum) {
            this.$confirm('操作成功, 是否继续操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).catch(() => {
              this.visible = false
            })
          }
        } else {
          this.$message(this.$t(res.msg))
        }
      })
    },
    // 弹窗关闭时
    closeHandle () {
      this.fileList = []
      this.$emit('refreshDataList')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
