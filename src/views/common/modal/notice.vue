
<template>
  <el-dialog
    :title="$t('window.notice')"
    :visible.sync="visible"
    :append-to-body="true"
    id="notice"
  >
  公告
  </el-dialog>
</template>

<script type="text/jsx">
export default {
  name: 'notice-c',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      visible: false
    }
  },
  computed: {},
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
// @import '';
#notice{
}
</style>
