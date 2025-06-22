import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.config.globalProperties.$axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

app.mount('#app');
