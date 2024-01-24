import { defineStore } from 'pinia';
import { store } from '../StoreService';
import type { IMenuItem } from '@/layouts/default/components/CooSidebar/types';
import { ref } from 'vue';

const useStore = defineStore('MenuStore', () => {
  // state
  const menus = ref<IMenuItem[]>([]);

  // actions
  function setMenus(val: IMenuItem[]) {
    menus.value = val;
  }

  return {
    menus,
    setMenus,
  };
});

const menuStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { menuStoreHook };
