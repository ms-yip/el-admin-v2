<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '编辑'"
    :visible.sync="visible"
    @close="resetDataForm"
  >
    <el-form
      :model="dataForm"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      :rules="dataRule"
      label-width="150px"
    >
      <el-form-item :label="$t('角色名称')" prop="roleName">
        <el-input v-model="dataForm.roleName" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('级别')" prop="roleLevel">
        <el-select size="mini" v-model="dataForm.roleLevel">
          <el-option
            v-for="item in levelList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
        v-loading.fullscreen.lock="fullscreenLoading"
      >确定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/jsx">
export default {
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      visible: false,
      fullscreenLoading: false,
      levelList: [],
      clickStatu: false,
      dataForm: {
        id: '',
        roleName: '',
        roleLevel: '0'
      },
      dataRule: {
        roleName: [
          {
            required: true,
            message: this.$t('sys.role.roleName') + this.$t('info.common.notNull '),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  created () {
  },
  mounted () {
    this.levelList = this.$store.getters['getDictList']('user.level')
  },
  methods: {
    init (item) {
      this.visible = true
      console.log(item)
      console.log(this.dataForm)
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        if (item) {
          this.dataForm = item || ''
        }
      })
    },
    resetDataForm () {
      this.dataForm = {
        id: '',
        roleName: '',
        roleLevel: '0'
      }
    },
    dataFormSubmit () {
      if (!this.clickStatu) {
        this.clickStatu = true
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            let params = {}
            params = {
              id: this.dataForm.id || null,
              roleName: this.dataForm.roleName,
              roleLevel: this.dataForm.roleLevel,
              language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
            }
            this.$http({
              url:
                '/service/role/save',
              method: 'post',
              data: params,
              contentType: 'json'
            }).then((res) => {
              console.log(res)
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
</style>
