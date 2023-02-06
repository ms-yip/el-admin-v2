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
      <el-form-item :label="$t('编号')" prop="code">
        <el-input v-model="dataForm.code" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('中文')" prop="nameEnUs">
        <el-input v-model="dataForm.nameEnUs" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('英文')" prop="nameLocal">
        <el-input v-model="dataForm.nameLocal" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('数据值')" prop="value">
        <el-input v-model="dataForm.value" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('备注')" prop="memo">
        <el-input v-model="dataForm.memo" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('状态')" prop="flag">
        <el-select size="mini" v-model="dataForm.flag">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
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
import refreshUserData from '@/mixins/refreshUserData'
export default {
  components: {},
  mixins: [refreshUserData],
  props: {},
  data () {
    return {
      visible: false,
      fullscreenLoading: false,
      clickStatu: false,
      statusList: [
        {
          value: 1,
          label: this.$t('sys.user.enable')
        },
        {
          value: 2,
          label: this.$t('sys.user.unable')
        }
      ],
      dataForm: {
        id: '',
        code: '',
        nameEnUs: '',
        nameLocal: '',
        memo: '',
        value: '',
        flag: 1
      },
      dataRule: {
        code: [
          {
            required: true,
            message: this.$t('sys.lang.code') + this.$t('info.common.notNull '),
            trigger: 'blur'
          }
        ],
        nameEnUs: [
          {
            required: true,
            message: this.$t('sys.lang.nameEnUs') + this.$t('info.common.notNull '),
            trigger: 'blur'
          }
        ],
        nameLocal: [
          {
            required: true,
            message: this.$t('sys.lang.nameLocal') + this.$t('info.common.notNull '),
            trigger: 'blur'
          }
        ],
        value: [
          {
            required: true,
            message: this.$t('sys.lang.value') + this.$t('info.common.notNull '),
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
  },
  methods: {
    init (item, type) {
      this.visible = true
      console.log(item)
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        if (item) {
          this.dataForm = item || ''
          if (type === 'copy') {
            this.dataForm.id = ''
          }
        }
      })
    },
    resetDataForm () {
      this.dataForm = {
        id: '',
        code: '',
        nameEnUs: '',
        nameLocal: '',
        memo: '',
        value: '',
        flag: 1
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
              code: this.dataForm.code,
              nameLocal: this.dataForm.nameLocal,
              nameEnUs: this.dataForm.nameEnUs,
              memo: this.dataForm.memo,
              value: this.dataForm.value,
              flag: this.dataForm.flag,
              language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
            }
            this.$http({
              url:
                '/service/data/save',
              method: 'post',
              data: params,
              contentType: 'json'
            }).then((res) => {
              if (res && res.code === 0) {
                this.refreshUserData('datas')
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
