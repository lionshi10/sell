import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/',
            name: '',
            component: index,
            children: [
                { path: '/goods', component: goods, name: '商品' },
                { path: '/seller', component: seller, name: '商家' },
                { path: '/ratings', component: ratings, name: '评价' },
            ]
        },

        {
            path: '*',
            name: 'index',
            component: index
        },
    ]
})