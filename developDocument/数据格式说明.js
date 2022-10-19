// 菜单数据格式说明
export const menu = [
  {
    children: [], // Array<object> 嵌套 格式相同
    flag: '1', // 是否展示
    icon: '', // 菜单iconfont 
    id: '1010',  // 唯一标识
    moduleLevel: 1, // 3代表是叶子节点 可以跳转路由
    name: '菜单一', // 菜单名称
    nameEnUs: 'Monitor', //国际化英文
    nameLocal: '监控', // 国际化中文
    parentId: '0', //parentId=0 代表是顶级节点
    url: '' // 路由
  },
]
