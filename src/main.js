import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import _ from 'lodash'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
