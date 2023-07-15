import IndexViewVue from '@/views/IndexView.vue'
import PromptViewVue from '@/views/PromptView.vue'
import * as VueRouter from 'vue-router'

const routes: VueRouter.RouteRecordRaw[] = [
	{ path: '/', component: IndexViewVue },
	{ path: '/prompt', component: PromptViewVue },
]

export default VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes
})
