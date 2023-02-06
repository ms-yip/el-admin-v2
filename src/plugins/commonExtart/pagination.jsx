export function paginationRender (h) {
  return (
    <el-pagination
      on-size-change={val => {
        this.sizeChangeHandle(val);
      }}
      on-current-change={val => {
        this.currentChangeHandle(val);
      }}
      current-page={this.pageIndex}
      page-sizes={[10, 20, 50, 100]}
      page-size={this.pageSize}
      total={this.totalCount}
      layout="prev, pager, next, total, sizes"
      class="grid-pagination"
    ></el-pagination>
  );
}


export default {
  name: 'paginationRender',
  inject: {
    pageIndex: { default: () => undefined },
    pageSize: { default: () => undefined },
    totalCount: { default: () => undefined },
    getDataList: { default: () => undefined }
  },
  props: {},
  mounted() {
    console.log(this.pageIndex);
  },
  methods: {
    // 切换每页数量
    sizeChangeHandle (val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getDataList(0);
    },
    // 切换分页
    currentChangeHandle (val) {
      this.pageIndex = val;
      this.getDataList(0);
    },
  },
  render () {
    return (
    <el-pagination
      on-size-change={val => {
        this.sizeChangeHandle(val);
      }}
      on-current-change={val => {
        this.currentChangeHandle(val);
      }}
      current-page={this.pageIndex}
      page-sizes={[10, 20, 50, 100]}
      page-size={this.pageSize}
      total={this.totalCount}
      layout="prev, pager, next, total, sizes"
      class="grid-pagination"
    ></el-pagination>
  );
  }
}
