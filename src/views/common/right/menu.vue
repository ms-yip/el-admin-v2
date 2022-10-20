
<template>
  <div id="flex-menu" :style="'min-width:' + minWidth+ 'px'">
    <!-- left btn -->
    <div
      :class="[
        'menu-btn',
        'el-icon-caret-left',
        { dsiabled: firstDispayItemIndex <= 0 },
      ]"
      :style="'color:'+ btnColor"
      @click="toLeft"
      v-if="list.length > realDispayNum"
    ></div>

    <div class="list-box" :style="'width:' + dispayboxWidth + 'px'">
      <div class="list-innerbox" :style="'left: ' + left + 'px'">
        <template v-for="(menu, index) in list">
          <div
            class="menu-item-box"
            :key="menu.id"
            ref="list"
            @click="selected(menu.id, index)"
            :style="'min-width:'+ boxItemWidth + 'px'"
          >
            <div :class="['menu-item-innerbox', { active: index === selectedIndex }]" :style="styleObject(index === selectedIndex)">
              <i :class="[menu.icon, 'el-icon-s-order', 'icon']"></i>
              <span>
                {{ menu.name }}
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- right btn -->
    <div
      :class="[
        'menu-btn',
        'el-icon-caret-right',
        { dsiabled: realDispayNum >= list.length - firstDispayItemIndex },
      ]"
        :style="'color:'+ btnColor"
      @click="toRight"
      v-if="list.length > realDispayNum"
    ></div>
  </div>
</template>

<script type="text/jsx">
export default {
  name: 'flex-menu',
  components: {},
  mixins: [],
  props: {
    value: {
      type: [String, Number]
    },
    activeKey: {
      default: 'id'
    },
    list: {
      type: Array,
      default: () => []
    },
    boxItemWidth: {
      type: [String, Number],
      default: 155
    },
    btnColor: {
      type: String,
      default: '#1d84ef'
    },
    textColor: {
      default: '#000000'
    },
    activeColor: {
      default: '#0072ff'
    },
    width: {
      type: [Number],
      default: document.documentElement.clientWidth
    }
  },
  data () {
    return {
      isfirst: true,
      ItemWidthList: [], // 头部各个菜单的宽度
      left: 0, // 头部菜单左移长度
      firstDispayItemIndex: 0, // 展示的首项Index
      selectedIndex: '' // 选中菜单的Index
    }
  },
  computed: {
    realDispayNum () {
      const len = this.list.length
      if (len <= this.maxShowNum) {
        return len
      }
      return this.maxShowNum
    },
    minWidth () {
      return this.boxItemWidth + 17 * 2
    },
    maxShowNum () {
      const maxlen = this.list.length
      const temp = Math.floor((this.width - 17 * 2) / this.boxItemWidth)
      return (temp > maxlen ? maxlen : temp) || 1
    },
    dispayboxWidth () {
      // 菜单显示区宽度，-1是因为间隔才有1pxborder
      return this.realDispayNum * this.boxItemWidth - 1
    },
    activeId: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    styleObject () {
      return function (val) {
        return {
          color: this.textColor,
          background: val ? this.activeColor : 'unset'
        }
      }
    }
  },
  created () {},
  mounted () {
    // this.ItemWidthList = this.$refs.list.map((i) => i.offsetWidth) // 不固定宽度3
  },
  methods: {
    calcMoveWidth (moveNum) {
      let width = 0
      // 固定宽度
      width = moveNum * this.boxItemWidth
      // for (let j = 0; j < this.firstDispayItemIndex; j++) {
      //   width += this.ItemWidthList[j]
      return width
    },
    toLeft () {
      if (this.firstDispayItemIndex !== 0) {
        this.firstDispayItemIndex--
        this.left = -this.calcMoveWidth(this.firstDispayItemIndex) - 1
      }
    },
    toRight () {
      if (this.realDispayNum < this.list.length - this.firstDispayItemIndex) {
        this.firstDispayItemIndex++
        this.left = -this.calcMoveWidth(this.firstDispayItemIndex) - 1
      }
    },
    selected (key, index) {
      this.selectedIndex = index
      if (this.activeId !== key) {
        this.activeId = key
        const selectedItem = this.list.find((item) => {
          return item.id === key
        })
        this.$emit('selected', selectedItem)
      }
    }
  },
  filters: {},
  watch: {
    list (val, old) {
      console.log(val, old)
      if (!this.isfirst) return
      if (this.activeId) {
        const list = this.list.find((item, index) => {
          if (item[this.activeKey] === this.activeId) {
            this.selectedIndex = index
            return true
          } else {
            return false
          }
        })
        if (list) {
          this.$emit('selected', list)
        } else {
          if (this.list.length > 0) {
            this.selectedIndex = 0
            const list = this.list[0]
            this.selected(list.id, 0)
          }
        }
      } else {
        if (this.list.length > 0) {
          this.selectedIndex = 0
          const list = this.list[0]
          this.selected(list.id, 0)
        }
      }
      this.isfirst = false
    }
  }
}
</script>
<style lang="scss" scoped>
#flex-menu {
  min-width: 189px;
  padding-right: 26px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  .menu-btn {
    width: 17px;
    height: 17px;
    line-height: 17px;
    border-radius: 3px;
    background: #ffffff;
    flex-shrink: 0;
    &.dsiabled {
      background: #ffffff;
      opacity: 0.25;
    }
  }
  .list-box {
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    flex-direction: column;
    .list-innerbox {
      flex-shrink: 0;
      display: flex;
      position: absolute;
      height: 100%;
      top: 0;
      .menu-item-box {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        &+.menu-item-box {
          &:before {
            content: '';
            position: absolute;
            height: 22px;
            left: 0;
            top: 19px;
            border-left: 1px solid #ffffff;
          }
        }
        .menu-item-innerbox {
          width: 135px;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          &.active {
            // background: #0072ff;
            border-radius: 3px;
          }
          .icon {
            width: 22px;
            height: 22px;
            font-size: 22px;
            margin-bottom: 4px;
          }
          span {
            text-align: center;
            width: 100%;
            padding-left: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

      }
    }
  }
}
</style>
