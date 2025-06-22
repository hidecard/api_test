import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

Vue.prototype.$axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

new Vue({
    render: h => h(App),
}).$mount('#app')