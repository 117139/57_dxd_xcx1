import Vue from 'vue'
import App from './App'

import store from './store'
import event from 'common/event.js'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

Vue.prototype.event = event;

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()