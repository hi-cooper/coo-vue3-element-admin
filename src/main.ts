import 'element-plus/theme-chalk/index.css';
import '@/assets/main.css';

import 'virtual:svg-icons-register';
import { createApp } from 'vue';
import ComponetService from '@/components/ComponetService';
import StoreService from '@/stores/StoreService';
import RouterService from '@/router/RouterService';
import App from '@/App.vue';

if (import.meta.env.MODE === 'mock') {
  import('@/mock/index');
}

function setup() {
  const app = createApp(App);

  ComponetService.setup(app);
  StoreService.setup(app);
  RouterService.setup(app);

  app.mount('#app');
}

setup();
