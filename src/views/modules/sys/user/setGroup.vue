<template>
  <el-dialog :title="this.$t('window.view')" :visible.sync="visible">
    <h2 class="info-title">{{$t('feelview.term.group.sendGroup')}}</h2>
    <el-col :span="8" v-for="item in groupList" :key="item.groupId">
      <el-checkbox v-model="item.check" :label="item.groupName"></el-checkbox>
    </el-col>
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
  props: {},
  data () {
    return {
      visible: false,
      fullscreenLoading: false,
      clickStatu: false,
      groupList: [],
      checkList: [],
      userId: ''
    }
  },
  computed: {},
  created () {
  },
  mounted () {
  },
  methods: {
    init (item) {
      this.visible = true
      this.userId = item.id
      this.getNoPage(item)
    },
    getNoPage (item) {
      let params = {}
      params = {
        userId: item.id,
        deptId: item.deptId,
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
      }
      this.$http({
        url:
          '/service/devGroup/getNoPage',
        method: 'post',
        data: params,
        contentType: 'json'
      }).then((res) => {
        if (res && res.resultCode === 0) {
          this.groupList = res.data.allData
          this.checkList = res.data.data
          for (let i of this.groupList) {
            for (let j of this.checkList) {
              if (i.groupId === j.groupId) {
                this.$set(i, 'check', true)
              }
            }
          }
        } else {
          this.$message(this.$t(res.msg))
        }
      })
    },
    dataFormSubmit () {
      if (!this.clickStatu) {
        this.clickStatu = true
        this.fullscreenLoading = true
        let ids = this.groupList.filter(item => item.check).map(item => {
          return item.groupId
        })
        let params = {}
        params = {
          userId: this.userId,
          ids: ids,
          language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
        }
        this.$http({
          url:
            '/service/devGroup/saveGroupPrivi',
          method: 'post',
          data: params,
          contentType: 'json'
        }).then((res) => {
          console.log(res)
          if (res && res.resultCode === 0) {
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
              message: this.$t(res.resultMsg),
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
.info-title {
  font-size: 14px;
  padding: 0px 0 10px 14px;
}
</style>
