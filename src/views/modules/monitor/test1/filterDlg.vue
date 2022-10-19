
<template>
  <el-dialog id="filter-dlg"
    :visible.sync="visible"
    :append-to-body="true"
  >
    <el-form
      :model="dataForm"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="150px"
    >
      <el-form-item :label="$t('编号')" prop="password">
        <el-input
          type="password"
          v-model="dataForm.password"
          maxlength="16"
          minlength="6"
        />
      </el-form-item>
      <el-form-item :label="$t('状态')" prop="password">
        <el-select v-model="dataForm.opsType">
            <el-option :label="this.$t('status.all')" value="" />
            <el-option
              v-for="item in modleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
      </el-form-item>
      <el-form-item :label="$t('分组')" prop="password">
        <el-select v-model="dataForm.opsType">
            <el-option :label="this.$t('status.all')" value="" />
            <el-option
              v-for="item in modleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="reset">{{ $t('button.reset') }}</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
      >
        {{ $t('btn.save') }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script type="text/jsx">
export default {
  name: 'filter-dlg',
  components: {},
  mixins: [],
  props: {
    value: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      visible: false,
      modleList: []
    }
  },
  computed: {
    dataForm: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    init () {
      this.visible = true
    },
    reset () {},
    dataFormSubmit () {
      this.visible = false
    }
  },
  filters: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
// @import '';
#filter-dlg{
}
</style>
