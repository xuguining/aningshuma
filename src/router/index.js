import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    // {
    //   path:"/",
    //   redirect:"/"
    // },
    {
        path: '/',
        // name: '/',
        redirect: '/homepage',
        component: HomeView,
        children: [{
                path: 'homepage',
                name: 'HomePage',
                // alims:"",
                // 路由懒加载
                component: () =>
                    import ('@/views/HomePage.vue')
            },
            {
                path: 'classcation',
                name: 'ClassCation',
                component: () =>
                    import ('@/views/ClassCation.vue')
            },
            {
                path: 'shopcard',
                name: 'ShopCard',
                component: () =>
                    import ('@/views/ShopCard.vue')
            },
            {
                path: 'myview',
                name: 'MyView',
                component: () =>
                    import ('@/views/MyView.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/LoginView.vue')
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    // },
    {
        path: '/my',
        name: 'My',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/MyView.vue')
    },
    // {
    //     path: '/myCity',
    //     name: 'MyCity',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '@/views/MyCity.vue')
    // },
    {
        path: '/searchView',
        name: 'SearchView',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/SearchView.vue')
    },
    {
        path: '/productDetail',
        name: 'ProductDetail',
        component: () =>
            import ('@/views/ProductDetail.vue')
    },
    {
        path: '/myAddress',
        name: 'MyAddress',
        component: () =>
            import ('@/views/MyAddress.vue')
    },
    // {
    //     path: '/needSelect',
    //     name: 'NeedSelect',
    //     component: () =>
    //         import ('@/views/NeedSelect.vue')
    // },
    {
      path: '/OrderCompletion',
      name: 'OrderCompletion',
      component: () => import('@/views/OrderCompletion.vue')
    },
    {
        path: '/submitOrder',
        name: 'SubmitOrder',
        component: () =>
            import ('@/views/SubmitOrder.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router