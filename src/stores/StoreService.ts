import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

function _init(): void {
  // console.log('Store init');
}

const StoreService = {
  setup(app: App<Element>) {
    app.use(store);
    _init();
  },
};

export default StoreService;
export { store };
