import Vue from 'vue'
import App from './App.vue'

//Import du router : vue add router
import router from './router'
//Import axios
import axios from 'axios'
import VueAxios from 'vue-axios'

//import bootstrap
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)

//On greffe vue cli a id app de public/index.html <div id="app"> etc...
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
