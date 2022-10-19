一. (路径别名)路径标识指向：
  '@': '/src'
  '@modules': 'src/views/modules'
  '@components':'src/components'

二.全局性方法
1. 获取字典列表：
this.$store.getters['getDictList'](dictName)
return Array
2. 获取字典对象
this.$store.getters['getDictObj'](dictName, value)
return Object || null
3. 获取字典值(文案)
this.$store.getters['getDictName'](dictName, value)
return Any || ''
4. 获取页面按钮权限
this.$store.getters['getPermissionsByCode'](code) // 菜单的code
return Array || undefined

```js
console.log(this.$store.getters['getDictList']('SpecialParameter'))
console.log(this.$store.getters['getDictObj']('SpecialParameter', 'OTHER_INFO.eventDiffTime'))
console.log(this.$store.getters['getDictName']('SpecialParameter', 'OTHER_INFO.eventDiffTime'))
console.log(this.$store.getters['getPermissionsByCode']('AtmpStatusSetting'))
console.log(this.$store.getters['getPermissionsByCode']('monitoring.status.terminal'))
```


三.vue-router路由命名规范
以modules目录为根目录，如机构管理功能根据目录命名为/sys/dept/deptList 【必须】
因为模块较多，建议路由文件放在模块下，命名为router.js, 后统一引入。

四.vuex 数据管理及缓存数据说明
vuex：
store 存储
i18n -  locale（默认zh） 、languages （zh、en）
user（用户信息） - 其中sessionId 等
common （系统框架需要的必要数据）包括菜单、权限，clientWidth/clientheight等 ，
涉及到存储在vuex 数据的获取请见 第二点。
缓存数据：
vuex store 数据已自动实现 loacalStorege 存储 user 和common模块数据 所以不需要手动维护。
其他业务数据缓存：
1. 经讨论，建议 机构、区域等数据不建议存储 因为存在变化，每个菜单页为时间基准获取一次，既弹框可从列表页传入
2. 其他业务数据不见存在vuex 里面，后续可讨论


五.业务修改基础数据说明
如业务中有修改到或业务关联设计数据修改  languages（i18n多语言）、menus（菜单）、privileges（按钮权限）、datas（字典）、events（未知用处，以后需要在补充）
如修改了菜单 需要更新用户菜单权限 引入 mixins中refreshUserData 
调用 this.refreshUserData(<String>)方法；
参数说明languages（i18n多语言）、menus（菜单）、privileges（按钮权限）、datas（字典）、events（未知用
```js
import refleshUserData from '../../mixins/refreshUserData'
···
mixins: [refleshUserData],
···
this.refreshUserData('languages')// ['languages', 'menus', 'privileges', 'datas', 'events']
```


五.（axios）http请求说明
基础用法请参照axios文档
说明：
1.post请求 默认传formdata， 如需传json， 接口请设置config.contentType === 'json'
```js
this.$http({
  url:
    `/service/module/delete`,
  method: 'post',
  data: params,
  contentType: 'json'
}).then((res) => {
  console.log(res)
  if (res && res.code === 0) {
    this.refresh()
    this.$message({
      message: this.$t('info.common.deletesuccess'),
      type: 'success',
      duration: 1500
    })
  } else {
    this.$message.error(this.$t(res.resultMsg))
  }
})
```


六.样式，为多人合作开发，避免相互影响，定一下规则
0. 可以使用css、less、scss
1. 只对单个vue文件的样式，写在组件内，且加上scoped限制，避免影响其他组件
2. 影响多个组件样式，建议写在assets/modules 中，在组件内引入使用
3. 仅全局性样式才写在assets/index 文件中，比如 elementui 全局样式覆盖

七. 业务开发简单说明
1. 为加快业务开发，可使用页面系统grid插件，可直接使用，详情请参考grid插件文档
2. 页面中按钮需要进行权限控制，系统封装了btn-list组件可直接使用，
    注意：
    ①为防止因系统配置错误导致系统运行过程中出现报错，请做好判断和友好提示。
    ②业务方法名根据权限系统配置一一对应（即菜单配置的按钮的code值），如需修改请做好基础数据的维护
3. 页面中文案请用国际化，grid组件columns 内置已处理，仅需传国际化code值即可

八. src\plugins 常用的工具函数集合
根据业务实际需要自行引入使用，比如时间戳转字符串

九. 其他建议
1. 为保证项目业务代码的高可维护性、高可阅读性，建议弹框功能单独成单页面组件,详情请参考 /views/common/main.vue、notice.vue,userInfo.vue 的交互

十.项目业务功能目录说明
业务代码在src/views/modelus 目录下，业务页面需要分模块


十一. 关于element 
系统默认element 使用 size：mini
无需手动设置，尽量保持风格统一，尽量避免在页面上使用其他size的组件






