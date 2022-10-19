
<template>
  <div id="btn-list">
    <el-button
      :icon="item.icon"
      @click="onclick(item.code)"
      :type="btnIndex === 0 ? 'primary' : ''"
      v-for="(item, btnIndex) in data"
      :key="btnIndex"
    >{{ LOCLE === 'zh' ? item.nameLocal : item.nameEnUs }}
    </el-button>
  </div>
</template>

<script type="text/jsx">
export default {
  name: 'btn-list',
  components: {},
  mixins: [],
  props: {
    data: {
      type: [Array],
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  computed: {
    LOCLE () {
      return (this.$store && this.$store.state && this.$store.state.i18n && this.$store.state.i18n.locale)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onclick (val) {
      this.$emit('click', val)
    }
  },
  filters: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#btn-list{
}
</style>
