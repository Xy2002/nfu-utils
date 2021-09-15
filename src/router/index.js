import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login';
import info from '../views/info'
import calendar from '../views/calendar'
import examList from "../views/examList";
import transcriptList from "../views/transcriptList";
import creditManage from "../views/creditManage";
import sponsor from "../views/sponsor"
//
// const originalPush = VueRouter.prototype.push
//
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
//

Vue.use(VueRouter)

const routes = [
    {path: '/login', component: login},
    {path: '/info', component: info},
    {path: '/calendar', component: calendar},
    {path: '/examList', component: examList},
    {path: '/transcriptList', component: transcriptList},
    {path: '/creditManage', component: creditManage},
    {path: '/sponsor', component: sponsor},

]

const router = new VueRouter({
    mode: "hash",
    routes
})

router.beforeEach((to, from, next) => {
    if (window._hmt) {
        if (to.path) {
            window._hmt.push(['_trackPageview', '/#' + to.fullPath])
        }
    }
    next()
})

export default router
