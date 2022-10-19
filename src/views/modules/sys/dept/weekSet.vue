<template>
  <el-dialog :title="$t('window.setWeek')" :visible.sync="visible">
    <el-table :data="tableData">
      <el-table-column prop="weekday" :label="$t('feelview.dept.week')" align="center"></el-table-column>
      <el-table-column prop="weekFlag" :label="$t('feelview.dept.isWorkDay')" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.weekFlag"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="weekBegintime" :label="$t('feelview.dept.startTime')" align="center">
        <template slot-scope="scope">
          <el-time-picker
            v-model="scope.row.weekBegintime"
            style="width: 120px"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
          ></el-time-picker>
        </template>
      </el-table-column>
      <el-table-column prop="weekEndtime" :label="$t('feelview.dept.endTime')" align="center">
        <template slot-scope="scope">
          <el-time-picker
            v-model="scope.row.weekEndtime"
            style="width: 120px"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
          ></el-time-picker>
        </template>
      </el-table-column>
    </el-table>
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
      clickStatu: false,
      fullscreenLoading: false,
      deptId: '',
      id: '',
      tableData: [],
      weekday: []
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
      this.deptId = id
      this.getWeekSet()
      this.weekday = this.$t('common.fullDayNames').split(',')
      this.weekday.push(this.weekday.shift())
    },
    getWeekSet () {
      let params = {}
      this.tableData = []
      params = {
        deptId: this.deptId,
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
      }
      this.$http({
        url: '/service/dept_weekset/get',
        method: 'post',
        data: params,
        contentType: 'json'
      }).then((res) => {
        if (res && res.code === 0) {
          for (let i = 1; i <= 7; i++) {
            // 工作日默认周一至周五, 8:00至17:00
            this.id = res.data.id
            let obj = {}
            obj.weekday = this.weekday[i - 1]
            if (res.data['weekBegintime' + i]) {
              obj.weekBegintime = res.data['weekBegintime' + i]
            } else {
              obj.weekBegintime = '08:00:00'
            }
            if (res.data['weekEndtime' + i]) {
              obj.weekEndtime = res.data['weekBegintime' + i]
            } else {
              obj.weekEndtime = '17:00:00'
            }
            if (res.data['weekFlag' + i]) {
              obj.weekFlag = Boolean(res.data['weekFlag' + i] === '1')
            } else {
              obj.weekFlag = Boolean(i < 6)
            }
            this.tableData.push(obj)
          }
          console.log(this.tableData)
        }
      })
    },
    dataFormSubmit () {
      if (!this.clickStatu) {
        this.clickStatu = true
        this.fullscreenLoading = true
        let params = {}
        params = {
          id: this.id || null,
          deptId: this.deptId,
          language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
        }
        for (let i = 1; i <= 7; i++) {
          params['weekBegintime' + i] = this.tableData[i - 1].weekBegintime
          params['weekEndtime' + i] = this.tableData[i - 1].weekEndtime
          params['weekFlag' + i] = this.tableData[i - 1].weekFlag ? '1' : '0'
        }
        this.$http({
          url:
            '/service/dept_weekset/save',
          method: 'post',
          data: params,
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
