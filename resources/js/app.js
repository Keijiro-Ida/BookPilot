import './bootstrap';
import { createApp } from 'vue';
import store from './store.js';
import router from './router';
import HeaderComponent from "./components/HeaderComponent.vue";

const app = createApp({});

app.component('header-component', HeaderComponent);
app.use(router);
app.use(store);
app.mount('#app');
