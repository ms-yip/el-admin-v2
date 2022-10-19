<template>
  <el-dialog
    :title="!dataForm.id ? this.$t('window.add') : this.$t('window.edit')"
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

      <el-form-item :label="$t('sys.menu.nameEnUs')" prop="nameEnUs">
        <el-input v-model="dataForm.nameEnUs" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sys.menu.nameLocal')" prop="nameLocal">
        <el-input v-model="dataForm.nameLocal" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sys.menu.parentName')" prop="parentName">
        <el-select size="mini" v-model="dataForm.parentName">
          <el-option :value="dataForm.parentName">
            <el-tree :data="menuList" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('sys.menu.moduleType')" prop="moduleType">
        <el-select size="mini" v-model="dataForm.moduleType" :disabled="editable">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('icon')" prop="iconUrl">
        <el-input v-model="dataForm.iconUrl" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('url')" prop="url">
        <el-input v-model="dataForm.url" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sys.menu.memo')" prop="memo">
        <el-input v-model="dataForm.memo" :maxlength="25"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sys.menu.flag')" prop="flag">
        <el-select size="mini" v-model="dataForm.flag">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
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
import refleshUserData from '@/mixins/refreshUserData'
export default {
  components: {},
  mixins: [refleshUserData],
  props: {},
  data () {
    return {
      menuList: [],
      statusList: this.$store.getters['getDictList']('dept.status'),
      typeList: this.$store.getters['getDictList']('dept.status'),
      visible: false,
      fullscreenLoading: false,
      clickStatu: false,
      editable: false,
      type: '',
      dataForm: {
        parentId: '',
        code: '',
        nameEnUs: '',
        nameLocal: '',
        id: '',
        name: '',
        moduleIndex: '',
        moduleType: '0',
        flag: '1',
        memo: '',
        url: '',
        urlVue: '',
        iconUrl: '',
        moduleLevel: 1,
        parentName: ''
      },
      parentLabel: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dataRule: {
        code: [
          {
            required: true,
            message: this.$t('sys.menu.code') + this.$t('info.common.notNull '),
            trigger: 'blur'
          }
        ],
        nameEnUs: [
          {
            required: true,
            message: this.$t('sys.menu.nameEnUs') + this.$t('info.common.notNull '),
            trigger: 'blur'
          }
        ],
        nameLocal: [
          {
            required: true,
            message: this.$t('sys.menu.nameLocal') + this.$t('info.common.notNull '),
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
    this.getMenuList()
  },
  methods: {
    // 初始化
    init (item, type) {
      this.type = ''
      this.visible = true
      this.disabled = false
      console.log(item)
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        if (item) {
          item.moduleType = String(item.moduleType)
          this.dataForm = item || ''
          if (type === 'copy') {
            this.dataForm.id = null
          }
        }
      })
    },
    resetDataForm () {
      this.dataForm = {
        parentId: '',
        code: '',
        nameEnUs: '',
        nameLocal: '',
        id: '',
        name: '',
        moduleIndex: '',
        moduleType: '0',
        flag: '1',
        memo: '',
        url: '',
        urlVue: '',
        iconUrl: '',
        moduleLevel: 1,
        parentName: ''
      }
    },
    getMenuList () {
      this.$http.get(`/service/module/getTree/${this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'}`).then(res => {
        if (res.code === 0) {
          this.menuList = res.data
        } else {
          this.$message(this.$t(res.msg))
        }
      })
    },
    handleNodeClick (val) {
      this.dataForm.parentId = val.id
      this.dataForm.parentName = val.name
      this.dataForm.moduleLevel = val.moduleLevel + 1
      console.log(val)
    },
    // 表单提交
    dataFormSubmit () {
      if (!this.clickStatu) {
        this.clickStatu = true
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            let params = {}
            params = {
              id: this.dataForm.id || '',
              code: this.dataForm.code,
              nameLocal: this.dataForm.nameLocal,
              nameEnUs: this.dataForm.nameEnUs,
              parentId: this.dataForm.parentId,
              parentName: this.dataForm.parentName,
              moduleIndex: this.dataForm.moduleIndex,
              moduleType: this.dataForm.moduleType,
              flag: this.dataForm.flag,
              memo: this.dataForm.memo,
              moduleLevel: this.dataForm.moduleLevel,
              url: this.dataForm.url,
              urlVue: this.dataForm.urlVue,
              iconUrl: this.dataForm.iconUrl,
              language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
            }
            this.$http({
              url:
                `/service/module/save`,
              method: 'post',
              data: params,
              contentType: 'json'
            }).then((res) => {
              if (res && res.code === 0) {
                this.refreshUserData('menus')
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
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  background-color: white;
}
</style>
