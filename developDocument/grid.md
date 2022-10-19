### 使用
1.  样式问题， grid 默认100% ，父盒子高度需要设置
```js
import Grid from './plugins/commonExtart/index'
Vue.use(Grid)

```

```html
<template>
  <div class="mod-schedule">
    <grid
      :api="api"
      :columns="dataList"
      :model.sync="dataForm"
      :rowKey="'id'"
      ref="test"
    >
      <div slot="form">
        <el-form-item :label="this.$t('schedule.beanName')">
          <el-input
            size="mini"
            v-model="dataForm.beanName"
            :placeholder="this.$t('schedule.beanName')"
            clearable
          ></el-input>
        </el-form-item>
      </div>
      <div slot="toolbar">
        <el-button
          v-if="this.$store.getters.getPermissionsByCode('sys:schedule:save')"
          type="primary"
          size="mini"
          icon="icon-ic_tianjia"
          @click="addOrUpdateHandle()"
          >{{this.$t('btn.add')}}</el-button
        >
        <el-button
          v-if="this.$store.getters.getPermissionsByCode('sys:schedule:delete')"
          size="mini"
          plain
          @click="deleteHandle()"
          icon="icon-ic_tianjia"
          :disabled="dataListSelections.length <= 0"
          >{{this.$t('btn.delete')}}</el-button
        >
      </div>
    </grid>
  </div>
</template>
```


### Grid 参数说明

|         参数         | 是否必填 |              说明              |     类型      |                            可选值                            |                   默认值                   |                             备注                             |
| :------------------: | :------: | :----------------------------: | :-----------: | :----------------------------------------------------------: | :----------------------------------------: | :----------------------------------------------------------: |
|        layout        |          |        页面模块布局顺序        |     Array     | 'toolbar', 'form', 'table', 'pagination'，'graphTable','monitor' | ["form", "toolbar", "table", "pagination"] | 默认是按照layout数组给定的顺序渲染（排除form，form自动矫正第一个）,传值则按传值的渲染显示内容 |
|       columns        |          |         表格显示列配置         | Array(Object) |                              -                               |                     []                     |                                                              |
|        model         |          |        表单数据请求对象        |    Object     |                              -                               |                     {}                     | 为支持自动重置，请在使用该参数时添加.sync，重置按钮按照model的初始值来重置。**特别说明：组件内已实现自动维护啊分页参数，故使用的时候不需要传** |
|       methods        |          |            请求方法            |    String     |                         'get','post'                         |                   'get'                    |                                                              |
|         api          |    √     |         请求数据的接口         |    String     |                              -                               |                     ''                     |                                                              |
|    requestOptions    |          |          API请求设置           |    Object     |                              -                               |                     -                      |                     axios请求的其他设置                      |
|        rowKey        |          |                                |    String     |                              -                               |                     -                      |                                                              |
|     autoGetData      |          |      列表是否自动请求数据      |    Boolean    |                          true,false                          |                    true                    |   设置为false时， 需要手动触发请求，请使用getDataList方法    |
|   requestCallback    |          |         自定义请求处理         |   Function    |                              -                               |                     -                      |                    不传则使用默认处理方式                    |
|      spanMethod      |          |          合并表格方法          |   Function    |                              =                               |                     -                      |                                                              |
|   multiSelectedArr   |          |      表格checkbox选择数据      |     Array     |                                                              |                                            |                  请在使用该参数时添加.sync                   |
| selectedByMouseClick |          |        点击行选中的数据        |    Object     |                                                              |                    null                    |                  请在使用该参数时添加.sync                   |
|    returnDataKey     |          |        分页数据取值键名        |    String     |                              -                               |                   result                   |                                                              |
|       reserve        |          |      表格checkbox是否反选      |    Boolean    |                         true\|false                          |                                            |                                                              |
|        border        |          |        表格是否有boder         |    Boolean    |                         true\|false                          |                   false                    |                                                              |
|  resetDataFormType   |          |        重置按钮设置类型        |    String     |                            'init'                            |                     -                      |                设为init，树不默认选中首个节点                |
|       hasTree        |          |          是否有左侧树          |    Boolean    |                         true\|false                          |                   false                    |                                                              |
|     singleSelect     |          |       checkbox是否为单选       |    Boolean    |                         true\|false                          |                   false                    |                                                              |
|   treeAutoGetData    |          | 左侧树是否自动触发grid查询请求 |    Boolean    |                        true \| false                         |                    true                    |                                                              |
|     hasBoxShadow     |          |  grid 组件外是否 有boxshadow   |    Boolean    |                        true \| false                         |                    true                    |                                                              |



### columns 表格详细显示列配置参数说明

| 参数         |         说明         |              类型              |           可选值           |  默认值  |                         备注                          |
| ------------ | :------------------: | :----------------------------: | :------------------------: | :------: | :---------------------------------------------------: |
| type         |         类型         |             String             | expand, default, selection | default  |                                                       |
| label        |         表头         |             String             |             -              |    ''    |                       表头文本                        |
| width        |        列宽度        |        Number \| String        |             -              |          |                                                       |
| minWidth     |      列最小宽度      |        Number \| String        |             -              |          |                  Eg：“150” \|\| 150                   |
| prop         |         字段         |             String             |             -              |    ''    |   读取该行数据的 prop 字段作为表格文本，优先级最低    |
| render       |         编译         | function(h,{row,index,column}) |             -              |    -     | 需要自定义表格内容模板时使用，当type为expand 必须使用 |
| fixed        |        列冻结        |             String             |                            |  false   |                                                       |
| sortable     |         排序         |            Boolean             |       true ｜ false        |  false   |                                                       |
| header-align |     表头对齐方式     |             String             |                            | 'center' |                 请参照element对应传值                 |
| align        |     字体对齐方式     |             String             |                            | 'center' |                 请参照element对应传值                 |
| tooltips     | 超长悬停显示完整提示 |            Boolean             |       true ｜ false        |   true   |                                                       |
| children     |  表头嵌套（多级别）  |         Array<object>          |                            |          |                                                       |

#### example:

```js
const columns = [
        { type: 'selection', width: "50", fixed: "left" },
        { label: 'schedule.ID', prop: 'jobId' },
        { label: 'schedule.beanName', prop: "beanName" },
        { label: 'schedule.params', prop: "params" },
        { label: 'schedule.cronExpression', prop: "cronExpression" },
        { label: 'schedule.remark', prop: "remark" },
        {
          label: 'schedule.status',
          render (h, { row }) {
            return (row.status === 0 ? <el-tag size="small">{this.$t('start')}</el-tag> : <el-tag size="small" type="danger">{this.$t('pause')}</el-tag>)
          }
        },
        {
          label: 'operate',
          fixed: "right",
          render (h, { row }) {
            const edt = (
              <el-button
                type="text"
                size="small"
                on-click={() => this.addOrUpdateHandle(row.userId)}
                icon="icon-ic_bianji"
              ></el-button>
            );
            const dlt = (
              <el-button
                type="text"
                size="small"
                on-click={() => this.deleteHandle(row.userId)}
                icon="icon-ic_shanchu"
              ></el-button>
            );
            let btnArr = [];
            btnArr.push(edt);
            btnArr.push(dlt);
            return btnArr;
          }
        }
      ];
```

### slot 组件插槽

| 参数    |                    说明                    |
| ------- | :----------------------------------------: |
| toolbar |  内嵌 html 内容 对应 layout 值为 toolbar   |
| graph   | 当layout传入graphTable，切换成图显示的内容 |
| form    |                查询表单内容                |
| formBtn |            查询表单按钮预留插槽            |
| monitor |             自定义内容显示插槽             |

### grid 内置方法

|     方法名      | 说明                                    | 备注 |
| :-------------: | --------------------------------------- | ---- |
|   getDataList   | 请求数据                                |      |
| getMulSelection | 有selection时，获取勾选的项，返回数组。  |      |
|  resetFormData  | 重置请求表单                             |      |
|  toggleRowExpansion  | 树形结构展开收缩                    |      |
|  toggleAllSelection  | 表格数据全选取消全选兼容树形数据     |      |
| toggleRowExpansion | 表格中树展开收缩，@params  isExpansion  <boolaen> | |

### 事件

| 事件       | 说明                                                         | 备注 |
| ---------- | ------------------------------------------------------------ | ---- |
| listLoaded | 当layout 有设置为graph时，默认先加载表格，加载完表格后触发，图部分可以通过改事件获取到数据源 |      |
|            |                                                              |      |
|            |                                                              |      |




### Grid组件常用可访问参数

| 参数名     | 含义            |      |
| ---------- | --------------- | ---- |
| list       | 表格数据        |      |
| pageIndex  | 分页参数-页索引 |      |
| pageSize   | 分页参数-每页数 |      |
| totalCount | 分页参数-总数   |      |


### 组件适用接口数据格式说明

请求参数规范：(**说明：pageNo、pageSize必须和其他参数处于同级关系**)

```
{
	pageNo: 3, // 组件参数，自动不需要维护
	pageSize: 10, // 组件参数，自动不需要维护
	language: zh_CN, // 业务参数
	account: '', // 业务参数
	name: '', // 业务参数
	treeDeptId:'', // 业务参数
}
```



**接口数据返回格式必须严格执行**

凡分页数据返回参照如下：

```js
{
    "code":0,
    "data":{
        // "pageNo":1, // 非必需
        // "pageSize":10, // 非必需
        "result":[
            {
                "account":"001001",
                "deptId":"0001",
                "deptName":"33"
            },
            {
                "account":"001002",
                "deptId":"0001_1015_0101_1006_1015",
                "deptName":"",
            }
        ],
        "totalCount":352,
        // "totalPages":36 // 非必需
    },
    "msg":"info.common.operation"
}
```

