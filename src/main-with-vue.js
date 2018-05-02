/* eslint-disable no-new */

import './main.scss'

import Vue from 'vue'
import Main from './components/main/main.vue'

new Vue({
  el: '#app',
  template: '<my-main />',
  components: {
    'my-main': Main
  }
})
