import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Main from '@/views/common/main.vue'
import Login from '@/views/common/login.vue'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch((err) => err)
}
const asyncComponentHook = (url) => () => {
  return import(`../views/modules${url}.vue`).catch((e) => {
    console.log(e)
    return import('@/views/common/404.vue')
  })
}

Vue.use(Router)
// 白名单只能是不涉及权限和其他不关联用户登录的业务路由
const whiteList = [
  {
    path: '/404',
    component: () => import('@/views/common/404.vue'),
    name: '404',
    meta: {
      title: '404未找到'
    }
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      title: '登录'
    }
  }
]

const router = new Router({
  routes: [
    ...whiteList,
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
      ]
    }
  ],
  hasAddDynamicMenuRoutes: false // 是否动态添加路由
})

function isWhite (route) {
  const globalRoutePathSet = new Set()
  if (globalRoutePathSet.size) {
    return globalRoutePathSet.has(route.path)
  }
  const routes = [...whiteList]
  for (let i = 0; i < routes.length; i++) {
    globalRoutePathSet.add(routes[i].path)
    if (routes[i] && routes[i].children && routes[i].children.length) {
    // if (routes[i]?.children?.length) {
      routes.push(...routes[i].children)
    }
  }
  return globalRoutePathSet.has(route.path)
}

export function AddDynamiRoutes (routersArr) {
  if (router.options.hasAddDynamicMenuRoutes) return
  const busiRoutersArr = routersArr
  busiRoutersArr.forEach(route => {
    if (route.path) router.addRoute('main', route)
  })
  router.options.hasAddDynamicMenuRoutes = true
}
router.AddDynamiRoutes = AddDynamiRoutes

router.beforeEach((to, from, next) => {
  if (isWhite(to)) {
    next()
  } else {
    const signedIn = sessionStorage.getItem('sessionId')
    let routers = JSON.parse(JSON.stringify(store.state.common.busiRouters)) || []
    routers.forEach(i => {
      i.component = asyncComponentHook(i.path)
    })
    if (signedIn) {
      if (to.name === 'main' && !router.options.hasAddDynamicMenuRoutes && routers.length) {
        AddDynamiRoutes(routers)
        next({ ...to, replace: true })
      }
      if (!router.options.hasAddDynamicMenuRoutes && routers.length) {
        AddDynamiRoutes(routers)
        next({ ...to, replace: true })
      }
      next()
    } else {
      next({path: '/login', replace: true})
      // next()
    }
  }
})

export default router
