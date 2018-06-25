import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const Store = new Vuex.Store({
	state: {
		user: null,
	},
	mutations: {
		setUser(state, user) {
			state.user = user
		},
	},
	actions: {
		setUser(context, user) {
			context.commit('setUser', user)
		},
	},
})

export interface IUser {
	_id: string
	login: string
	password: string
	world: any
}
