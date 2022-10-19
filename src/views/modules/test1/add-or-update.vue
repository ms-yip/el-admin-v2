<template>
  <el-dialog
    :title="!dataForm.id ? this.$t('window.add') : this.$t('window.edit')"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      :rules="dataRule"
      label-width="150px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('termGroup.name')" prop="groupName">
            <el-input v-model="dataForm.groupName" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('term.info.remark')" prop="memo">
            <el-input v-model="dataForm.memo" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableDatas"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="termId" :label="$t('term.info.termId')"></el-table-column>
        <el-table-column prop="dbcpName" :label="$t('term.info.deptName')"></el-table-column>
        <el-table-column prop="typeId" :label="$t('term.model.typeId')"></el-table-column>
        <el-table-column prop="modelId" :label="$t('term.info.modelId')"></el-table-column>
        <el-table-column prop="brandId" :label="$t('term.info.brandId')"></el-table-column>
      </el-table>
    </el-form>
    <div slot="footer">
      <el-button @click="visible = false">{{$t('button.cancel')}}</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
        v-loading.fullscreen.lock="fullscreenLoading"
      >{{$t('button.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/jsx">
export default {
  components: {},
  mixins: [],
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    flag: {
      type: Number
    }
  },
  data () {
    return {
      visible: false,
      fullscreenLoading: false,
      clickStatu: false,
      isCashSelect: [],
      typeIdList: [],
      terminalBrandList: [],
      statusList: [],
      modelIdList: [],
      layoutTypeList: [],
      installTypeList: [],
      disabled: false,
      deptList: [],
      cityAreaList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dataForm: {
        groupName: '',
        memo: '',
        termId: '',
        typeId: '',
        terminalBrand: '',
        webName: '',
        status: '',
        modelId: '',
        layoutType: '',
        dbcpName: '',
        installType: ''
      },
      dataRule: {
        groupName: [
          {
            required: true,
            message: this.$t('termGroup.name') + this.$t('info.common.notNull '),
            trigger: 'blur'
          }
        ]
      },
      tableDatas: [],
      multipleSelection: []
    }
  },
  computed: {},
  created () {
  },
  mounted () {
    this.isCashSelect = this.$store.getters['getDictList']('dept.status')
    this.typeIdList = this.$store.getters['getDictList']('dept.status')
    this.terminalBrandList = this.$store.getters['getDictList']('dept.status')
    this.statusList = this.$store.getters['getDictList']('dept.status')
    this.modelIdList = this.$store.getters['getDictList']('dept.status')
    this.layoutTypeList = this.$store.getters['getDictList']('dept.status')
    this.installTypeList = this.$store.getters['getDictList']('dept.status')
    this.$nextTick(() => {
      this.tableData.forEach(row => {
        if (this.multipleSelection.indexOf(row.id) >= 0) {
          this.$refs.multipleTable.toggleRowSelection(row, true)
        }
      })
    })
  },
  methods: {
    // 表格选择
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 部门名称树
    getDeptList () {
      let params = {}
      params = {
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
      }
      this.$http({
        url: '/service/dept/getDepts',
        method: 'post',
        data: params,
        contentType: 'json'
      }).then(res => {
        if (res.code === 0) {
          this.deptList = res.data
        } else {
          this.$message(this.$t(res.msg))
        }
      })
    },
    handleNodeClick (val) {
      this.dataForm.parentId = val.id
      this.dataForm.deptLevel = val.deptLevel + 1
      this.dataForm.dbcpName = val.name
    },
    init (item, type) {
      this.getDeptList()
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        if (this.flag === 0 || this.flag === 1) {
          this.dataForm.flag = this.flag
        }
        if (item) {
          this.dataForm = item || ''
          if (type === 'copy') {
            this.dataForm.id = ''
          }
        }
      })
    },
    dataFormSelect () {
      console.log(this.dataForm)
      this.$http({
        url: '/list/3',
        method: 'post',
        data: this.dataForm,
        contentType: 'json'
      }).then((res) => {
        if (res && res.code === 0) {
          res.data.result.forEach(item => {
            this.tableDatas.push(item.filter)
          })
        }
      })
    },
    // 保存的时候传什么数据
    dataFormSubmit () {
      if (!this.clickStatu) {
        this.clickStatu = true
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            this.$http({
              url:
                '/save',
              method: 'post',
              data: this.dataForm,
              contentType: 'json'
            }).then((res) => {
              if (res && res.code === 0) {
                this.visible = false
                this.$emit('refreshDataList')
                this.$message({
                  message: this.$t('operateSuccess'),
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.clickStatu = false
                    this.fullscreenLoading = false
                  }
                })
              } else {
                this.$message({
                  message: this.$t(res.msg),
                  type: 'error',
                  duration: 1500,
                  onClose: () => {
                    this.clickStatu = false
                    this.fullscreenLoading = false
                  }
                })
              }
            })
          }
        })
      }
      setTimeout(() => {
        this.clickStatu = false
        this.fullscreenLoading = false
      }, 1500)
    }
  },
  filters: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
// @import '';
:deep .form-content {
  display:none;
}
:deep .el-form-item__label{
  width:100px !important;
}
:deep .el-form-item__content{
  margin-left: 100px !important;
}
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  background-color: white;
}
</style>
