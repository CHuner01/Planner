import main_page from '../pages/main_page.vue'
import registration from '../pages/registration.vue'
import authorization from '../pages/authorization.vue'
import {createWebHistory, createRouter } from 'vue-router'


const routes = [
    {
        path: '/authorization',
        name: 'auth',
        component: authorization
    },
    {
        path: '/registration',
        name: 'regis',
        component: registration
    },
    {
        path: '/',
        name: 'main',
        component: main_page
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})