import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Asistencia from './views/Asistencia.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/asistencia',
            name: 'Asistencia',
            component: Asistencia
        }
    ]
})
