import 'element-plus/theme-chalk/index.css';
import './assets/main.css';

import ComponetService from '@/components/ComponetService';
import { createApp } from 'vue';
import StoreService from '@/stores/StoreService';
import RouterService from '@/router/RouterService';

import App from './App.vue';

const app = createApp(App);

ComponetService.setup(app);
StoreService.setup(app);
RouterService.setup(app);

app.mount('#app');
