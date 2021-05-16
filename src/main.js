import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vuelidate from 'vuelidate'
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'

Vue.use(VueNoty)

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
