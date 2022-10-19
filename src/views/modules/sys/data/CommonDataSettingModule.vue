<template>
  <div id="CommonDataSettingModule">
    <el-row>
      <div class="settingModule">
        <label>时间设置</label>
        <el-input class style="width:100px" v-model="eventPassTime" :maxlength="25"></el-input>
        <el-button type="primary" @click="dataFormSubmit()">{{$t('button.submit')}}</el-button>
      </div>
    </el-row>
  </div>
</template>

<script type="text/jsx">
export default {
  name: 'CommonDataSettingModule',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      eventPassTime: ''
    }
  },
  computed: {},
  created () { },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let params = {}
      params = {
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
      }
      this.$http({
        url:
          '/getSetting',
        method: 'post',
        data: params,
        contentType: 'json'
      }).then((res) => {
        if (res && res.code === 0) {
          this.eventPassTime = res.data.eventPassTime
        } else {
          this.$message.error(this.$t(res.msg))
        }
      })
    },
    dataFormSubmit () {
      let params = {}
      params = {
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us',
        eventPassTime: this.eventPassTime
      }
      this.$http({
        url:
          '/setting',
        method: 'post',
        data: params,
        contentType: 'json'
      }).then((res) => {
        if (res && res.code === 0) {
          this.$message({
            message: this.$t('info.common.operation'),
            type: 'success',
            duration: 1500,
            onClose: () => { }
          })
        } else {
          this.$message.error(this.$t(res.msg))
        }
      })
    }
  },
  filters: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
// @import '';
#userList {
}
.settingModule {
  margin: 40px;
  text-align: center;
}
</style>
