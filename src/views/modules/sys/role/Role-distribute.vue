<template>
  <el-dialog :title="this.$t('window.select')" :visible.sync="visible">
    <el-tree
      class="el-dialog-div"
      :data="menuList"
      :props="defaultProps"
      show-checkbox
      auto-expand-parent
      :default-expanded-keys="ids"
      nodeKey="id"
      @check-change="handleNodeChange"
      ref="tree"
    ></el-tree>
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
      parentName: '',
      menuList: [],
      id: '',
      ids: [],
      priviArray: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {},
  created () {
  },
  mounted () {
  },
  methods: {
    init (id) {
      this.visible = true
      this.id = id
      this.ids = []
      this.priviArray = []
      this.getRolePriviTree(id)
    },
    getRolePriviTree (id) {
      let params = {}
      params = {
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us',
        id: id
      }
      this.$http({
        url:
          '/role',
        method: 'post',
        data: params,
        contentType: 'json'
      }).then((res) => {
        if (res.code === 0) {
          this.menuList = res.data
          this.nestToSimple(this.menuList)
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.ids)
          })
        } else {
          this.$message(this.$t(res.msg))
        }
      })
    },
    nestToSimple (data) {
      data.forEach(item => {
        if (item.state === 1) {
          this.ids.push(item.id)
        }
        if (item.children && item.children.length > 0) {
          this.nestToSimple(item.children)
        }
      })
    },
    handleNodeChange () {
      this.$nextTick(() => {
        this.priviArray = this.$refs.tree.getCheckedKeys()
      })
    },
    dataFormSubmit () {
      if (!this.clickStatu) {
        this.clickStatu = true
        this.fullscreenLoading = true
        let params = {}
        params = {
          id: this.id,
          priviArray: this.priviArray,
          language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
        }
        this.$http({
          url:
            '/service/role',
          method: 'post',
          data: params,
          contentType: 'json'
        }).then((res) => {
          console.log(res)
          if (res && res.code === 0) {
            this.refreshUserData('privileges')
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
.el-dialog-div {
  max-height: 500px;
  overflow: auto;
}
</style>
