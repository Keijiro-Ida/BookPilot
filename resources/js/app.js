import './bootstrap';
import { createApp } from 'vue';
import store from './store.js';
import router from './router';
import axios from 'axios';
import CONST from '@/constants.js';
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');

axios.interceptors.request.use(config => {
    const token = store.state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
