export default [
  {
    path: '/monitor/test1/list',
    name: '/monitor/list',
    component: () => import('@modules/monitor/test1/list.vue'),
    meta: { title: '监控', icon: 'icon-ic_tongyiyonghu' },
  },
  {
    path: '/monitor/test1/detail',
    name: '/monitor/detail',
    component: () => import('@modules/monitor/test1/detail.vue'),
    meta: { title: '明细', icon: 'icon-ic_tongyiyonghu' },
  },
]
