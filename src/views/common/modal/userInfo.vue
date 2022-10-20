
<template>
    <el-dialog
      id="userInfo"
      :title="$t('window.userDetail')"
      :visible.sync="visible"
      :append-to-body="true"
      >
      <el-form v-model="dataForm" label-width="150px">
        <el-form-item :label="$t('sys.user.account')">
          <el-input v-model="dataForm.account"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sys.user.name')">
          <el-input v-model="dataForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sys.user.dept')">
          <el-input v-model="dataForm.deptInfo.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sys.user.tel')">
          <el-input v-model="dataForm.tel"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sys.user.email')">
          <el-input v-model="dataForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sys.user.lastLoginip')">
          <el-input v-model="dataForm.lastLoginip"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sys.user.lastLogintime')">
          <el-input v-model="lastLogintime"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sys.user.loginTotal')">
          <el-input v-model="dataForm.loginTotal"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script type="text/jsx">
import { getFormatDate } from '@/plugins/utils/index'
export default {
  name: 'userInfo',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      visible: false
    }
  },
  computed: {
    dataForm () {
      return this.$store.state.user
    },
    lastLogintime () {
      return getFormatDate(this.dataForm.lastLogintime)
    }
  },
  created () {},
  mounted () {},
  methods: {
    init () {
      this.visible = true
    }
  },
  filters: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#userInfo{
}
</style>
