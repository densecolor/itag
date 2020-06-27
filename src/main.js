import Vue from 'vue'
import 'normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import VeCharts from 've-charts'

Vue.use(VModal, {
  dialog: true,
  dynamic: true
})

Vue.use(VeCharts)

Vue.config.productionTip = false

Vue.prototype.$gapi = window.gapi

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
