import Vue from 'vue'
import Vuex from 'vuex'
import { CONSTANTS } from '@/Constants'

Vue.use(Vuex)

export const Store = new Vuex.Store({
	state: {
		user: JSON.parse(localStorage.getItem('user') || '{ }'),
	},
	mutations: {
		setUser(state, user) {
			state.user = user
		},
		setWorld(state, world) {
			state.user.world = world
		},
	},
	actions: {
		setUser(context, user) {
			context.commit('setUser', user)
			localStorage.setItem(
				'user',
				JSON.stringify({ _id: user._id, World: user.World }),
			)
		},
		async setWorld(context, world) {
			context.commit('setWorld', world)
			await fetch(`${CONSTANTS.BACKEND_URL}/user/${context.state.user._id}`, {
				method: 'POST',
				body: JSON.stringify(world),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			localStorage.setItem(
				'user',
				JSON.stringify({ _id: context.state.user._id, World: world }),
			)
		},
	},
})

export interface IUser {
	_id: string
	login: string
	password: string
	world: any
}
