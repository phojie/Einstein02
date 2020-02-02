
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: () => import('pages/Admin/Dashboard.vue'),
        name: 'dashBoard',
        meta: {
          firstLogin: true
        }
      },
      {
        path: '/classes',
        component: () => import('pages/Admin/Classes.vue'),
        meta: {
          firstLogin: true
        }
      },
      {
        path: '/classes/:classId',
        component: () => import('pages/ClassesFolder/homeClass.vue'),
        name: 'classDash'
      }
    ]
  },
  {
    path: '/classes/:classId/fullscreen',
    component: () => import('pages/ClassesFolder/homeClassFullscreen.vue'),
    name: 'classDashFULL'
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('layouts/yawaSettings/settingDash.vue'),
    children: [
      {
        path: 'profile',
        component: () => import('pages/Login/firstTime.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Public/Landing.vue') },
      { path: 'authjie1', component: () => import('pages/Login/firstTime.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    meta: {
      requiresAuth: true
    },
    component: () => import('pages/Error404.vue')
  })
}

export default routes
