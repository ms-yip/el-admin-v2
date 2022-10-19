
/**
 * @description: 渲染分页组件
 * @param {Object} h
 * @return: 分页template
 */
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

/**
 * @description: 判断对象是否是function类型
 * @param { Any } obj
 * @return: Boolean 是｜否
 */
export function isFunction (obj) {
  return Object.prototype.toString.call(obj) === 'object Function';
}

/**
 * @description: 渲染表格列和行
 * @param {Object} item
 * @param {Object} context
 * @return:表格的列
 */
export function tableCell (h, item, context) {
  let slotScope = {
    scopedSlots: {
    }
  };
  if (item.headerRender && typeof item.headerRender === 'function') {
    slotScope.scopedSlots.header = scope => item.headerRender.call(context, h, scope)
  }

  if (item.render && typeof item.render === 'function') {
    slotScope.scopedSlots.default = scope => item.render.call(context, h, scope)
    return (
      <el-table-column
        type={item.type}
        width={item.width + '' || ''}
        min-width={item.minWidth || ''}
        prop={item.prop || ''}
        label={context.$t(item.label)}
        fixed={item.fixed || false}
        sortable={item.sortable || false}
        header-align={item.headerAlign || 'center'}
        align={item.align || 'center'}
        show-overflow-tooltip={item.tooltips || true}
        {...slotScope}
      ></el-table-column>
    );
  }
  return (
    <el-table-column
      width={item.width + '' || ''}
      min-width={item.minWidth || ''}
      type={item.type}
      prop={item.prop || ''}
      label={context.$t(item.label)}
      fixed={item.fixed || false}
      sortable={item.sortable || false}
      reserve-selection={item.reserve || false}
      header-align={item.headerAlign || 'center'}
      align={item.align || 'center'}
      show-overflow-tooltip={item.tooltips || true}
      {...slotScope}
    >
      {item.children
        ? item.children.map(childItem => tableCell(h, childItem, context))
        : ''}
    </el-table-column>
  );
}

/**
 * @description: 渲染表格组件
 * @param {Object} h
 * @return: 表格template
 */
export function tableRender (h) {
  const tableCol = this.columns.map(item => {
    if (!item.isFilter) return tableCell(h, item, this.$parent)
  });
  const table =  <el-table
      data={this.list}
      v-loading={this.dataListLoading}
      stripe
      border={this.border}
      ref="table"
      height={this.tableH || undefined}
      row-key={this.rowKey || undefined}
      highlight-current-row
      span-method={this.spanMethod || undefined}
      on-select={(val, row) => { this.selectHandle(val, row) }}
      on-selection-change={(val) => {
        this.selectionChangeHandle(val);
      }}
      on-select-all={val => {
        this.selectAll(val);
      }}
      // on-row-click={(val, column) => {
      //   if (column.label !== 'Operate' && column.label !== '操作') {
      //     this.handleClickTableRow(val, column);
      //   }
      // }}
      on-cell-dblclick={val => {
        this.bccelldblclick(val);
      }}
      on-current-change={(newVal, oldVal) => { this.changeSingleSelect(newVal, oldVal) }}
      style="width: 100%;margin-top:20px;"
      header-row-class-name={'grid-table-head'}
      class="grid-table"
    >
      {tableCol}
  </el-table>

  return [table]
}

/**
 * @description: 渲染图表切换组件
 * @param {Object} h
 * @return: 表格template
 */
export function graphTableRender (h) {
  const graph = (this.$scopedSlots.graph && this.$scopedSlots.graph({ list: this.list})) || '';
  const pagination = paginationRender.call(this, h);
  if (this.dataType === 1) {
    return [graph, pagination];
  } else {
    const table = tableRender.call(this, h);
    return [table, pagination];
  }
}

/**
 * @description: 渲染查询表单
 * @param {Object} h
 * @return: 查询表单template
 */
export function formRender (h) {
  const more = (
    <div
      class={['more-select', this.moreStatus ? 'down' : 'up']}
      on-click={() => {
        this.moreSelect();
      }}
    >
      <span
        domPropsInnerHTML={
          this.moreStatus
            ? String(this.$t('button.expand'))
            : String(this.$t('button.collapse'))
        }
      ></span>
      <i
        class={
          this.moreStatus
            ? 'el-icon-caret-bottom'
            : 'el-icon-caret-top'
        }
      ></i>
    </div>
  );
  return (
    <div class="form-content">
      <div
        ref="contentForm"
        id="contentForm"
        class={[
          'grid-search-form-box',
          'has-shadow',
          this.moreStatus ? 'grid-more' : 'grid-less'
        ]}
        style={
          this.moreStatus ? 'height:' + this.singleLineFormHeight + 'px' : ''
        }
      >
        <div style="display:flex;" class="grid-search-form">
          <el-form
            ref="searchForm"
            class="search-form"
            inline={true}
            {...{
              props: {
                model: this.model
              }
            }}
          >
            {this.$slots.form ? this.$slots.form : ''}
          </el-form>
          <el-form style="min-width:224px;width:224px">
            <el-form-item>
              <el-button
                size="mini"
                type="primary"
                on-click={() => {
                  this.getDataList(1);
                }}
              >
                {this.$t('button.search')}
              </el-button>
              <el-button
                size="mini"
                on-click={() => {
                  this.resetFormData();
                }}
              >
                {this.$t('button.reset')}
              </el-button>
              {this.$slots.formBtn ? this.$slots.formBtn : ''}
            </el-form-item>
          </el-form>
        </div>
        {!!this.hasMoreBtn ? more : ''}
      </div>

      <div
        class={[
          'grid-search-form-box',
          'has-shadow',
          'grid-hide-form',
          this.moreStatus ? 'grid-more' : 'grid-less'
        ]}
      >
        <div style="display:flex;width：100%" class="grid-search-form">
          <el-form ref="gridHideForm" class="search-form" inline={true}>
            <el-form-item label="hide">
              <el-input size="mini" placeholder="hide" clearable></el-input>
            </el-form-item>
          </el-form>
          <el-form style="min-width:224px;width:224px">
            <el-form-item>
              <el-button
                size="mini"
                type="primary"
                on-click={() => {
                  this.getDataList(1);
                }}
              >
                {this.$t('button.search')}
              </el-button>
              <el-button
                size="mini"
                on-click={() => {
                  this.resetFormData();
                }}
              >
                {this.$t('button.reset')}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  );
}

/**
 * @description: 渲染工具栏
 * @param {type} h
 * @return: 工具栏template
 */
export function toolbarRender (h) {
  let toolbar = '';
  const filter = <el-popover
      placement="bottom"
      width="400"
      class="popover-btn"
      trigger="click">
        {this.filterCheckList.map(i => {
          return (<el-checkbox value={!i.isFilter} label={i.label} key={i.label} on-input={(val) => {this.changeFilter(val, i)}}>{this.$t(i.label)}</el-checkbox>)
        })}
      <el-button slot="reference" type="text" class="el-icon-setting">&nbsp;筛选</el-button>
    </el-popover>
  if (this.hasGraphTable) {
    toolbar = this.$slots.toolbar ? (
      <div class="graph-toolbar">
        <el-button-group class="data-type">
          <el-button
            size="mini"
            type={this.dataType === 0 ? 'primary' : ''}
            icon="el-icon-s-grid"
            on-click={() => {
              this.changeDatType(0);
            }}
          ></el-button>
          <el-button
            size="mini"
            type={this.dataType === 1 ? 'primary' : ''}
            icon="el-icon-s-data"
            on-click={() => {
              this.changeDatType(1);
            }}
          ></el-button>
        </el-button-group>
        {this.$slots.toolbar}
      </div>
    ) : (
      <el-button-group class="data-type">
        <el-button
          size="mini"
          type={this.dataType == 0 ? 'primary' : ''}
          icon="el-icon-s-grid"
          on-click={() => {
            this.changeDatType(0);
          }}
        ></el-button>
        <el-button
          size="mini"
          type={this.dataType == 1 ? 'primary' : ''}
          icon="el-icon-s-data"
          on-click={() => {
            this.changeDatType(1);
          }}
        ></el-button>
      </el-button-group>
    );
  } else {
    toolbar = this.$slots.toolbar ? <div>{this.$slots.toolbar}</div> : '';
  }
  const toolbox = <div class={'grid-tool-box'}>
    <div class="toolbar-left">{ toolbar }</div>
    <div class="toolbar-right">{ this.dataType === 0 && this.tableFilter ? filter : ''}</div>
  </div>;
  return toolbox;
}

/**
 * @description: 自定义内容显示
 * @param {type} h
 * @return: 工具栏template
 */
export function monitorRender (h) {
  const minitorSlot = this.$slots.monitor
  let monitor = this.$slots.monitor ? minitorSlot : '';
  return monitor;
}

/**
 * @description: 渲染左侧树
 * @param {type} h
 * @return: 左侧树状template
 */
export function treeRender (h) {
  const tree = (
    <div class={['grid-lefttree', this.showTree ? '' : 'undisplay']}>
      <feelview-tree
        ref="feeltree"
        on-selectNode={e => {
          this.gridselectNode(e);
        }}
        on-topDept={e => {
          this.gridgetTopDept(e);
        }}
        btnText={this.treeBtnText || { open: this.$t('button.expand'), close: this.$t('button.collapse')}}
        api={this.treeRequestOpt && this.treeRequestOpt.api || ''}
        method={this.treeRequestOpt && this.treeRequestOpt.method}
        data={this.treeRequestOpt && this.treeRequestOpt.data}
        config={this.treeRequestOpt && this.treeRequestOpt.config}
      ></feelview-tree>
    </div>
  );
  return tree;
}

export default {
  paginationRender,
  isFunction,
  tableCell,
  tableRender,
  graphTableRender,
  formRender,
  toolbarRender,
  monitorRender,
  treeRender
}