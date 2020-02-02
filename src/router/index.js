import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { LocalStorage } from 'quasar'
// import { fireAuth } from '../boot/firebase'
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const currentUser = LocalStorage.getItem('uid')
    // let currentUser = fireAuth.currentUser
    console.log(currentUser)
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !currentUser) {
      next({
        path: '/auth',
        query: {
          redirect: 'Robert,Raf,Senarlo,Gabriel,Francis,Nickol is on fire'
        }
      })
    } else if (!requiresAuth && currentUser) {
      next()
    } else {
      next()
    }
  })

  return Router
}
