import Vue from 'vue'
import App from './App'

import MyComponents from './components/'

Vue.use(MyComponents)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
