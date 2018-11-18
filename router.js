import Vue from 'vue'
import Router from 'vue-router'

import {
    Home,
    Login,
    Register,
    Materials,
    MaterialCategories,
    Products,
    ProductCategories,
    Users
} from '~/pages'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: Home
            },
            {
                path: '/users',
                component: Users
            },
            {
                path: '/materials',
                component: Materials
            },
            {
                path: '/materials/categories',
                component: MaterialCategories
            },
            {
                path: '/products',
                component: Products
            },
            {
                path: '/products/categories',
                component: ProductCategories
            },
            {
                path: '/login',
                component: Login
            },
            {
                path: '/register',
                component: Register
            }
        ]
    })
}
