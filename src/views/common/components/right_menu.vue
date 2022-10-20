<template>
  <div
    v-if="show"
    class="menu_style"
    :style="{ top: y + 'px', left: x + 'px' }"
  >
    <ul>
      <!-- 分别传递事件给父元素调用 -->
      <li
        @click="
          () => {
            $emit('refreshCurrent');
          }
        "
      >
        <i class="icon-ic_shuaxin"></i>
        {{ $t('com.refreshCurrentTab') }}
      </li>
      <li
        @click="
          () => {
            $emit('closeOther');
          }
        "
      >
        <i class="icon-ic_guanbi"></i>
        {{ $t('com.closeOtherTab') }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'right_menu',
  props: {
    x: {
      type: [Number],
      default: 0
    },
    y: {
      type: [Number],
      default: 0
    },
    showMenu: {
      type: [Boolean],
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    // 点击别处时隐藏目录，并传递一个关闭事件
    closeMenu () {
      this.show = false
      this.$emit('close', false)
    }
  },
  mounted () {
    // 监听body上的点击
    document.querySelector('body').addEventListener('click', this.closeMenu)
  },
  beforeDestroy () {
    // 移除监听
    document.querySelector('body').removeEventListener('click', this.closeMenu)
  },
  watch: {
    // 监听，保持显示状态与父元素一致
    showMenu (val) {
      this.show = val
    }
  }
}
</script>
<style scoped>
.menu_style {
  position: absolute;
  z-index: 931;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 14px #d0d0d0;
}
.menu_style > ul {
  padding: 0;
  margin: 0;
}
.menu_style > ul > li {
  line-height: 1;
  padding: 0.5em 1em;
  cursor: pointer;
  list-style: none;
  text-align: justify;
  white-space: nowrap;
}
.menu_style > ul > li:hover {
  background: #e0eeff;
}
</style>
