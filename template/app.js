import Vue from 'vue'
import Framework7Vue from 'framework7-vue'

import Routes from './src/routes.js'
import App from './src/app.vue'

Vue.use(Framework7Vue)

new Vue({
  el: '#app',
  render: h => {
    return h(App)
  },
  framework7: {
    root: '#app',
    routes: Routes,
    animateNavBackIcon: true
  },
  methods: {
    onF7Init () {
      console.log('f7 init...')
    }
  }
})
