import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import World from '@/components/World.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login,
		},
		{
			path: '/signUp',
			name: 'SignUp',
			component: SignUp,
		},
		{
			path: '/world',
			name: 'World',
			component: World,
		},
		{
			path: '/world/:userId',
			name: 'World',
			component: World,
		},
	],
})
