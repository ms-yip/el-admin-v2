import FeelviewTree from './feelview-tree/feelview-tree';
import {
  // paginationRender,
  isFunction,
  tableCell,
  tableRender,
  graphTableRender,
  formRender,
  toolbarRender,
  monitorRender,
  treeRender
} from './render-X';
import pagination from './pagination.jsx'
import "./style/index.scss";
const TEXT_OPTIONS = {
  open: '展开',
  close: '收起',
}
const TREE_REQUEST_DEFAULT = {
  api: '/service/dept/getDepts',
  method: 'post',
  data: { "language":  'zh_CN' , "name": "" },
  config: { contentType: 'json' }
}

const DEFAULT_OPTIONS = {
  LAYOUT: ['form', 'toolbar', 'table', 'pagination'],
  METHOD: 'GET',
  ROWKEY: 'id',
  RETURNdATAkEY: 'data'
}


export default {
  name: 'grid',
  components: { FeelviewTree,pagination },
  mixins: [],

  provide() {
    return {
      getDataList: this.getDataList,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      totalCount: this.totalCount
    };
  },


  props: {
    layout: {
      type: Array,
      default () {
        return DEFAULT_OPTIONS.LAYOUT;
      }
    },
    method: {
      type: String,
      default: DEFAULT_OPTIONS.METHOD
    },
    api: {
      type: String,
      required: true
    },
    requestOptions: {
      type: Object
    },
    columns: {
      type: Array,
      default: () => []
    },
    model: {
      type: Object,
      default: () => { }
    },
    rowKey: {
      type: String,
      default: DEFAULT_OPTIONS.ROWKEY
    },
    autoGetData: {
      type: Boolean,
      default: true
    },
    requestCallback: {
      type: Function
    },
    requestOption: {
      type: Object
    },
    // 左侧机构树
    hasTree: {
      type: Boolean,
      default: false
    },
    treeBtnText: {
      type: Object,
    },
    /* tree */
    treeRequestOpt: {
      type: Object,
      default: () => TREE_REQUEST_DEFAULT
    },
    treeAutoGetData: {
      type: Boolean,
      default: true
    },
    
    // apiType: {
    //   type: String,
    //   default: ''
    // },
    /* form */
    resetDataFormType: {
      type: String
    },
    /* table*/
    border: {
      type: Boolean,
      default: false
    },
    spanMethod: {
      type: Function
    },
    //checkbox选中行数据
    multiSelectedArr: {
      type: Array,
      default: () => []
    },
    selectedByMouseClick: {
      type: Object,
      default: null
    },
    returnDataKey: {
      type: String,
      default: DEFAULT_OPTIONS.RETURNdATAkEY
    },
  
    
    singleSelect: {
      type: Boolean,
      default: false
    },
    hasBoxShadow: {
      type: Boolean,
      default: true
    },
    // 是否默认表格行点击
    isDefaultTableColClick: {
      type: Boolean,
      default: true
    },
    // 需要反选数组  为一维数组 页面内先处理只剩下rowkey的一维数组集合
    selectKeysArray: {
      type: Array,
      default: () => []
    },
    gridFixedHeight: { //grid固定高度设置  单位px
      type: [Number, String]
    },
    getChartData: {
      type: Function
    },
    tableFilter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showTree: true,
      originForm: '',
      pageIndex: 1, // 分页参数-页索引
      pageSize: 10, // 分页参数-每页数
      totalCount: 0, // 分页参数-总数
      list: [], // 表格数据
      dataListLoading: false, // 表格局部刷新
      moreStatus: true, // 表单查询展开
      hasMoreBtn: true, // 是否有展开按钮
      foldStatu: false, // 展开收缩状态
      singleLineFormHeight: '', // 单行表单高度，用于计算要不要显示展开按钮
      tableH: undefined,
      contentFormH: 0,
      contentH: 0,
      dataType: 0, // 图表切换 0 是表， 1是图
      ids: [], // 全选用数组
      isCheckedAll: false, // 全选状态
      dataListSelections: [], // 复选选中数据 multiSelectedArr !== dataListSelections multiSelectedArr包含dataListSelections
      cancleArr: [], // multiSelectedKeysArray被取消的
      filterCheckList: [], // 表格过滤选项数组
      banColNum: 0, // 禁止过滤列数
    };
  },
  computed: {
    filterArrShowNum() {
      return this.filterCheckList.filter(i => i.isFilter === false).length
    },
    LOCALE () {
      return sessionStorage.getItem('locale') || 'zh'
    },
    dataListKeysArray () {
      const keyName = this.rowKey
      return this.dataListSelections.map(i => i[keyName])
    },
    multiSelectedKeysArray () {
      const keyName = this.rowKey
      return this.multiSelectedArr.map(i => i[keyName])
    },
    legacyKeysArray () {
      const a = new Set(this.multiSelectedKeysArray)
      const b = new Set(this.dataListKeysArray)
      return Array.from(new Set([...a].filter(x => !!!b.has(x) && this.cancleArr.indexOf(x) === -1)))
    },
    legacyListSelections () {
      return this.multiSelectedArr.filter(i => {
        const index = this.legacyKeysArray.indexOf(i[this.rowKey])
        if (index !== -1) {
          return i
        }
      })
    },
    hasPagination () {
      if (this.hasGraphTable) {
        // 图表暂时只支持分页的
        return true;
      } else {
        return this.layout.indexOf('pagination') >= 0;
      }
    },
    hasGraphTable () {
      if (this.layout.indexOf('graphTable') >= 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  created () {
    this.setOriginForm(this.model)
    // 生产checkbox
    this.columns.forEach((i, colIndex) => {
      if (!i.type) {
        if (i.banFilter) {
          this.banColNum++
        } else {
          this.filterCheckList.push({
            index: colIndex,
            label: i.label,
            isFilter: i.isFilter || false
          })
        }
      }
    })
  },
  mounted () {
    if (this.autoGetData) {
      this.$nextTick(() => {
        this.getDataList(0);
      })
    }
    let _this = this;
    this.calcTableH()
    if (_this.layout.indexOf('form') !== -1) { // 有表单才需要算按钮
      _this.calcing();
      window.addEventListener(
        'resize',
        _this.throttling(_this.calcing, 500, true)
      );
    }
  },
  methods: {
    changeFilter(val, obj) {
      if (val === false && this.filterArrShowNum <= 1 && this.banColNum === 0) return
      // val 为checkbox 的值，当val= false， isFilter = true 不显示
      this.$set(obj, 'isFilter', !val)
      obj = JSON.parse(JSON.stringify(obj))
      this.$set(this.columns[obj.index], 'isFilter', !val)
    },
    clearCancleArr () {
      this.cancleArr = []
    },
    setOriginForm (obj) {
      const temp = JSON.stringify(obj); // 这里必须要存json，js对象存的是指针呀， 不然你会发现他一直在变
      this.originForm = temp;
    },
    /// 前缘throttling
    throttling (fn, wait, immediate) {
      let timer,
        timeStamp = 0;
      let context, args;

      let run = () => {
        timer = setTimeout(() => {
          if (!immediate) {
            fn.apply(context, args);
          }
          clearTimeout(timer);
          timer = null;
        }, wait);
      };

      return function () {
        context = this;
        args = arguments;
        if (!timer) {
          if (immediate) {
            fn.apply(context, args);
          }
          run();
        } else {
        }
      };
    },
    calcing () {
      this.calcBtnStatus()
    },
    // 计算table高度
    calcTableH () {
      this.$nextTick(() => {

        if (this.tableFixedHeight) {
          this.tableH = this.tableFixedHeight
          return
        }
        if (typeof (this.$refs.table) !== 'undefined') {
          const tableWraper = window.getComputedStyle(this.$refs.table.$el)
            .height
          this.tableH = tableWraper
        }
      })
    },
    calcBtnStatus () {
      this.$nextTick(() => {
        if (!this.$refs.gridHideForm || !this.$refs.searchForm) {
          return;
        }
        const reference = window.getComputedStyle(this.$refs.gridHideForm.$el)
          .height;
        const referenceHeight = parseInt(reference);
        this.singleLineFormHeight = referenceHeight - 1; // 单行表单高度， 为了隐藏第二行input的框，牺牲1px
        const heightTxt = window.getComputedStyle(this.$refs.searchForm.$el).height;
        const realHeight = parseInt(heightTxt);
        if (realHeight > referenceHeight) {
          this.hasMoreBtn = true;
        } else {
          this.hasMoreBtn = false;
        }
      });
    },
    keyupHandler (e) {
      if (e.keyCode === 13) {
        this.getDataList(0);
      }
    },
    // 双击进详情操作 emit
    bccelldblclick (row) {
      this.$emit('dbClickCell', row);
    },
    // 点击行选中
    handleClickTableRow (row, column) {
      if (this.isDefaultTableColClick) {
        this.$refs.table.toggleRowSelection(row);
      } else {
        this.$emit('tableRowClick', row)
      }
    },
    // 全选
    selectAll (arr) {
      this.toggleAllSelection(arr);
    },
    handleSelectionChange (selection) {
      this.ids = selection.map(obj => obj.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    handleSelectAllChange (selection) {
      this.toggleAllSelection(selection);
    },
    toggleAllSelection (selectedData) {
      this.isCheckedAll = !this.isCheckedAll;
      if (this.isCheckedAll) {
        selectedData.forEach(subRow => {
          if (subRow.hasOwnProperty('children')) {
            this.toggleSelection(subRow['children']);
          }
        });
      } else {
        this.$refs['table'].clearSelection();
      }
    },
    toggleSelection (rows, flag) {
      if (rows === null || !rows.length) {
        return;
      }
      rows.forEach(row => {
        if (!this.rowHasSelected(row)) {
          if (flag) {
            this.$refs['table'].toggleRowSelection(row, flag);
          } else {
            this.$refs['table'].toggleRowSelection(row);
          }
        }
        if (row['children']) {
          if (flag) {
            this.toggleSelection(row['children'], flag);
          } else {
            this.toggleSelection(row['children']);
          }
        }
      });
    },
    rowHasSelected (row) {
      let index = this.ids.indexOf(row.id);
      return ~index;
    },
    // 左侧机构树展开收缩
    showTreeHandle () {
      this.showTree = !this.showTree;
      this.$emit('treeToggle', this.showTree);
    },
    // 表格中树展开收缩
    toggleRowExpansion (isExpansion) {
      this.toggleRowExpansion_forAll(this.list, isExpansion);
    },
    toggleRowExpansion_forAll (data, isExpansion) {
      data.forEach(item => {
        this.$refs.table.toggleRowExpansion(item, isExpansion);
        if (item.children !== undefined && item.children !== null) {
          this.toggleRowExpansion_forAll(item.children, isExpansion);
        }
      });
    },
    // 重置
    resetFormData () {
      this.$emit('update:model', JSON.parse(this.originForm));
      // this.selectArrayCopy = []
      this.$emit('update:multiSelectedArr', [])
      this.closeAndclearSelection()
      setTimeout(() => {
        if (this.hasTree) {
          this.$refs.feeltree.resetTree()
          this.$refs.feeltree.$children[2].$children[0].$el.click()
        } else {
          this.getDataList(1);
        }
      });
    },
    // 搜索的展开、收缩
    moreSelect () {
      this.moreStatus = !this.moreStatus;
      this.$nextTick(function () {
        this.contentFormH = this.$refs.contentForm.clientHeight;
        // document.getElementById('boxContent').style.height = (this.contentH - this.contentFormH) + 'px'
        // console.error(this.contentFormH, this.contentH);
      });
    },
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
    selectHandle(selection, row) {
      const hasSelection = this.$refs.table.selection.filter(item => item[this.rowKey] === row[this.rowKey])
      const isSelect = !!hasSelection.length
      if (isSelect) {
        if (this.singleSelect) {
          // 此流程为单选控制
          if (selection.length > 1) {
            setTimeout(() => {
              // 勾选的取消选择
              this.$refs.table.toggleRowSelection(selection[0], false);
            }, 0)
          } else {
          }
        } else {
          if (row && row.children && row.children.length) {
            this.$nextTick(() => {
              this.toggleSelection(row.children, true)
            })
          }
        }

      } else {
        this.cancleArr.push(row[this.rowKey])
        if (this.singleSelect) {

        } else {
          if (row && row.children && row.children.length) {
            row.children.forEach(i => {
              this.$nextTick(() => {
                this.toggleSelection(row.children, false)
              })
            })
          }
        }
      }
      if (this.multiSelectedArr) {
        this.$emit('update:multiSelectedArr', this.dataListSelections);
      }
    },
    // select-change
    selectionChangeHandle (val) {
      this.dataListSelections = val
      if (this.singleSelect) {
        this.$emit('update:multiSelectedArr', this.dataListSelections)
        return
      }
      let arr = [...this.dataListSelections, ...this.legacyListSelections]
      this.$emit('update:multiSelectedArr', arr)
    },
    changeSingleSelect(val, oldVal) {
      console.log(val, oldVal);
      this.$emit('update:selectedByMouseClick', val)
    },
    // 获取多选项
    getMulSelection () {
      return this.dataListSelections || [];
    },
    // 获取数据列表
    getDataList (reflesh = 1) {
      let needRefresh = reflesh
      if (this.getChartData) {
        this.getChartData()
      }
      if (needRefresh) {
        this.pageIndex = 1;
        this.$emit('update:multiSelectedArr', [])
        // this.selectArrayCopy = []
        this.closeAndclearSelection()
      }
      let params = {};
      if (this.hasPagination) {
        params = {
          pageNo: this.pageIndex,
          pageSize: this.pageSize,
          language: this.LOCALE === 'zh' ? 'zh_CN' : 'en_us',
          ...this.model
        };
      } else {
        params = {
          ...this.model
        };
      }
      let requestParams = {
        url: this.api,
        method: this.method
      };
      if (this.requestOptions) {
        Object.assign(requestParams, this.requestOptions)
      }
      if (this.method === 'post') {
        this.$set(requestParams, 'data', params);
        Object.assign(requestParams, this.requestOption)
      } else {
        this.$set(
          requestParams,
          'params',
          params
        );
      }
      this.list = [];// 清空数据
      this.dataListLoading = true;
      this.$http(requestParams)
        .then((res) => {
          if (this.requestCallback) {
            this.requestCallback(this, res); // 不用默认的数据处理情况
            this.$nextTick(() => {
              if (typeof (this.$refs.table) !== 'undefined') {
                this.$refs.table.doLayout();
                setTimeout(() => {
                  this.setSelectArray()
                }, 200);
              }
            });
          } else {
            if (res && res.code === 0) {
              if (this.hasPagination) {
                this.list = res[this.returnDataKey].result;
                this.totalCount = res[this.returnDataKey].totalCount;
              } else {
                this.list = res[this.returnDataKey];
              }
              this.$nextTick(() => {
                if (this.$refs.table) {
                  this.$refs.table.doLayout();
                  setTimeout(() => {
                    this.setSelectArray()
                  }, 200);
                }
              });
            } else {
              this.list = [];
              if (this.hasPagination) {
                this.totalCount = 0;
              }
              if (data.msg) {
                this.$message.error(res.msg)
              }
            }

            if (this.hasGraphTable) {
              this.$emit('listLoaded', res);
              //   关闭切换机构后切换会列表界面
              //   this.dataType = 0;
            } else {
              this.$emit('listLoaded');
            }
          }
          this.dataListLoading = false;
        })
        .catch(error => {
          if (
            error.message.indexOf(
              `Cannot read property 'data' of undefined`
            ) === -1
          ) {
            this.list = [];
            this.dataListLoading = false;
          }
        });
    },
    // 切换图表
    changeDatType (index) {
      if (this.dataType !== index) {
        this.dataType = index;
        if (this.dataType === 0) {
          this.getDataList(0);
        } else {
          this.$emit('changeGraph');
        }
      }
    },
    // 切换机构
    gridselectNode (e) {
      this.model.deptId = e.id;
      this.model.deptPath = e.deptPath;
      this.model.deptName = this.LOCALE === 'zh' ? e.label : e.deptI18nCode;
      // 切换机构 重置查询参
      this.$emit('update:model', this.model);
      setTimeout(() => {
        // 换机构 要重置必要参数
        this.getDataList(1);
      });
      if (this.selectNode) {
        this.selectNode();
      } else {
        this.model.deptId = e.id;
        this.model.deptPath = e.deptPath;
        this.model.deptName = this.LOCALE === 'zh' ? e.label : e.deptI18nCode;
        // 切换机构不重置查询参
        this.$emit('update:model', this.model);
        setTimeout(() => {
          this.getDataList(1);
        });
      }
    },
    // 加载树后自动触发并传递顶级数据，需要
    gridgetTopDept (e) {
      let originForm = JSON.parse(this.originForm);
      if (this.resetDataFormType === 'init') {
        originForm['deptId'] = '';
        originForm['deptPath'] = '';
        originForm['deptName'] = '';
      } else {
        originForm['deptId'] = e.id || '';
        originForm['deptPath'] = e.deptPath || '';
        originForm['deptName'] = this.LOCALE === 'zh' ? e.label : e.deptI18nCode;
      }
      this.originForm = JSON.stringify(originForm);

      this.$emit('update:model', JSON.parse(this.originForm));
      setTimeout(() => {
        if (this.treeAutoGetData) {
          this.getDataList(1);
        }
      });
    },
    setSelectArray () {
      this.multiSelectedKeysArray.forEach(row => {
        for (let item of this.list) {
          if (row === item[this.rowKey]) {
            this.$refs.table.toggleRowSelection(item, true);
            return
          } else if (typeof (item.children) !== 'undefined' && item.children !== null && item.children.length > 0) {
            // 表格树子节点回选
            for (let i in item.children) {
              if (item.children[i][this.rowKey] === row) {
                this.$refs.table.toggleRowSelection(item.children[i], true);
                return
              }
            }
          }
        }
      });
    },
    // 翻页记忆  调用清空当前选中数据
    closeAndclearSelection () {
      this.$nextTick(() => {
        this.clearCancleArr = [];
        if (typeof (this.$refs.table) !== 'undefined') {
          this.$refs.table.clearSelection();
          this.pageIndex = 1
          this.pageSize = 10
          this.totalCount = 0
          this.list = []
        }
      })
    },
    // 翻页记忆当前所选的数组
    // changePageSaveSelect () {
    //   this.selectArrayCopy = this.dataListSelections.map((item) => {
    //     return item[this.rowKey];
    //   });
    // }
  },
  filters: {},
  watch: {
    // list(val) {
    //   console.log(val);
    //  },
    // 监听那个原始数据的变化，只有一次初始化，之后就不变才对
    originForm: {
      deep: true,
      handler (val) { }
    },
    showTree () {
      this.calcBtnStatus();
    },
    // selectKeysArray: {
    //   handler (val) {
    //     // this.setSelectArray()
    //     this.selectArrayCopy = val
    //   },
    //   immediate: true
    // },
    multiSelectedArr: {
      handler (val) {
        if (val && val.length === 0) {
          // this.$refs.table.clearSelection();
          this.dataListSelections = []
          // this.$refs.table.doLayout();
        }
      },
      immediate: true
    }
  },
  render (h) {
    const TEMPLATE_MAP = {
      form: formRender.call(this, h),
      toolbar: toolbarRender.call(this, h),
      table: tableRender.call(this, h),
      graphTable: graphTableRender.call(this, h),
      pagination: <pagination></pagination>,
      monitor: monitorRender.call(this, h)
    };
    // 页面渲染是原则上按照layout数组顺序的，但是实际考虑from放在首个
    const l = this.layout.map(item => TEMPLATE_MAP[item]);
    const formIndex = this.layout.indexOf('form');
    if (formIndex === -1) {
      // 没有查询条件
      return (
        <div id="s-grid" style={'height:' + this.gridFixedHeight + 'px'} class={['grid-box', this.hasBoxShadow ? 'hasShadow' : '']
        }>
          {this.height}

          {
            this.hasTree ? (
              <el-button type="text"
                class={[
                  this.showTree
                    ? 'el-icon-d-arrow-left show-tree-btn'
                    : 'el-icon-d-arrow-right show-tree-btn'
                ]}
                on-click={() => {
                  this.showTreeHandle();
                }}
              ></el-button>
            ) : (
              ''
            )
          }
          {this.hasTree ? treeRender.call(this, h) : ''}
          <div
            class={[
              'grid-content',
              this.hasTree && this.showTree ? 'hastree' : 'notree'
            ]}
          >
            {' '}
            {l}
          </div>
        </div >
      );
    } else if (formIndex === 0) {
      // 有form查询条件
      return (
        <div id="s-grid" style={'height:' + this.gridFixedHeight + 'px'} class={['grid-box', this.hasBoxShadow ? 'hasShadow' : '']}>
          {this.height}

          {this.hasTree ? (
            <el-button type="text"
              class={
                this.showTree
                  ? 'el-icon-d-arrow-left show-tree-btn'
                  : 'el-icon-d-arrow-right show-tree-btn'
              }
              on-click={() => {
                this.showTreeHandle();
              }}
            ></el-button>
          ) : (
            ''
          )}
          {this.hasTree ? treeRender.call(this, h) : ''}
          <div
            class={[
              'grid-content',
              this.hasTree && this.showTree ? 'hastree' : 'notree'
            ]}
            id="boxContent"
          >
            {l[0]}
            {l.slice(1)}
          </div>
        </div>
      );
    } else {
      // 纠正form不在第一个的位置
      temp = l.splice(formIndex, 1);
      return (
        <div id="s-grid" style={'height:' + this.gridFixedHeight + 'px'} class={['grid-box', this.hasBoxShadow ? 'hasShadow' : '']}>
          {this.height}
          {this.hasTree ? (
            <el-button type="text"
              class={
                this.showTree
                  ? 'icon-ic_shuangjiantou-zuo show-tree-btn'
                  : 'icon-ic_shuxingzujian show-tree-btn'
              }
              on-click={() => {
                this.showTreeHandle();
              }}
            ></el-button>
          ) : (
            ''
          )}
          {this.hasTree ? treeRender.call(this, h) : ''}
          <div
            class={[
              'grid-content',
              this.hasTree && this.showTree ? 'hastree' : 'notree'
            ]}
          >
            {temp}
            {l}
          </div>
        </div>
      );
    }
  }
};
