import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login'
import AddNews from './views/AddNews'
import AddProduct from './views/AddProduct'
import News from './views/News'
import Product from './views/Product'
import UpdateNews from './views/UpdateNews'
import UpdateProduct from './views/UpdateProduct'
import Types from './views/Types'
import AddType from './views/AddType'
import UpdateType from './views/UpdateType'
Vue.use(Router)

let route = new Router({

  // mode: 'history',
  base: 'admin',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: 0
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: 0
    },
    {
      path: '/addNews',
      name: 'addNews',
      component: AddNews,
      meta: 1
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      component: AddProduct,
      meta: 1
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      meta: 1
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
      meta: 1
    },
    {
      path: '/updateNews/:id',
      name: 'updateNews',
      component: UpdateNews,
      meta: 1
    },
    {
      path: '/updateProduct/:id',
      name: 'updateProduct',
      component: UpdateProduct,
      meta: 1
    },
    {
      path: '/types',
      name: 'types',
      component: Types,
      meta: 1
    },
    {
      path: '/addTypes',
      name: 'addTypes',
      component: AddType,
      meta: 1
    },
    {
      path: '/updateTypes/:id',
      name: 'updateTypes',
      component: UpdateType,
      meta: 1
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

route.beforeEach((to, from, next) => {
  let dhRoles = sessionStorage.getItem('dwr_roles')
  let dhNames = sessionStorage.getItem('dwr_names')
  // 获取用户权限信息，为空即没登录，跳转至登录页
  if (dhRoles && dhNames) {
    route.app.$options.store.state.roles = dhRoles
    route.app.$options.store.state.names = dhNames
  }
  if (to.path === '/login') {
    console.log('跳转至至login')
    if (dhRoles && dhNames) {
      next('home')
    } else {
      next()
    }
  } else {
    // 获取store中数据roles
    let role = route.app.$options.store.state.roles
    let name = route.app.$options.store.state.names
    console.log()
    if (role === '' || name === '') {
      console.log('role或name为空')
      next('/login')
    } else {
      // 通过indexOf判断 role中是否包含meta 从而确定是否跳转
      // if (role.indexOf(to.matched[0].meta) > -1) {
      // console.log(to.matched[0])
      // if (role > to.matched[0].meta) {
      //   console.log('执行了next')
      //   next()
      // } else {
      //   console.log('权限不足')
      //   next('403')
      // }
      next()
    }
  }
})

export default route
