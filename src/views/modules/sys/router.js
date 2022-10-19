export default [
  {
    path: '/sys/dept/list',
    name: 'deptList',
    component: () => import('@modules/sys/dept/list.vue'),
    meta: { title: '机构管理', icon: 'icon-ic_tongyiyonghu' },
  },
  {
    path: '/sys/menu/list',
    name: 'menuList',
    component: () => import('@modules/sys/menu/list.vue'),
    meta: { title: '菜单管理', icon: 'icon-ic_tongyiyonghu' },
  },
  {
    path: '/sys/lang/list',
    name: 'I18nList',
    component: () => import('@modules/sys/lang/list.vue'),
    meta: { title: '多语言管理', icon: 'icon-ic_tongyiyonghu' },
  },
  {
    path: '/sys/data/list',
    name: 'sysdictList',
    component: () => import('@modules/sys/data/list.vue'),
    meta: { title: '数据管理', icon: 'icon-ic_tongyiyonghu' },
  },
  {
    path: '/sys/user/list',
    name: 'UserList',
    component: () => import('@modules/sys/user/list.vue'),
    meta: { title: '用户管理', icon: 'icon-ic_tongyiyonghu' },
  },
  {
    path: '/sys/role/list',
    name: 'RoleList',
    component: () => import('@modules/sys/role/list.vue'),
    meta: { title: '角色管理', icon: 'icon-ic_tongyiyonghu' },
  },
  {
    path: '/sys/data/list',
    name: 'CommonDataSettingModule',
    component: () => import('@modules/sys/data/list.vue'),
    meta: { title: '常用参数配置', icon: 'icon-ic_tongyiyonghu' },
  },
  {
    path: '/sys/notices/list',
    name: 'NoticeList',
    component: () => import('@modules/sys/notices/list.vue'),
    meta: { title: '系统公告', icon: 'icon-ic_tongyiyonghu' },
  },
]
