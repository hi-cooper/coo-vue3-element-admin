import 'element-plus/theme-chalk/index.css';
import './assets/main.css';

import ComponetService from '@/components/ComponetService';
import { createApp } from 'vue';
import StoreService from '@/stores/StoreService';

import App from './App.vue';
import router from './router';

const app = createApp(App);

ComponetService.setup(app);
StoreService.setup(app);
app.use(router);

app.mount('#app');
