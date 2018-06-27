import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Store } from './store/User'

// @ts-ignore
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// @ts-ignore
import VueTheMask from 'vue-the-mask'
// @ts-ignore
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(VueTheMask)
Vue.config.productionTip = false
Vue.use(VueMaterial)

new Vue({
	router,
	store: Store,
	render: (h) => h(App),
}).$mount('#app')
