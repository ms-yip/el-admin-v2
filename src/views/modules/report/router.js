export default [
  {
    path: '/report/test1/list',
    name: 'report',
    component: () => import('@modules/report/test1/list.vue'),
    meta: { title: '统计报表', icon: 'icon-ic_tongyiyonghu' },
  },
]
