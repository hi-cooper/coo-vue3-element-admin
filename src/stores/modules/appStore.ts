import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { store } from '../StoreService';
import { ScreenWidthType } from '@/types';

const useStore = defineStore('AppStore', () => {
  // state
  const sidebar = reactive({
    opened: true,
    withoutAnimation: false,
  });
  const screen = reactive({
    widthType: ScreenWidthType.Big,
  });

  // actions
  function openSidebar() {
    sidebar.opened = true;
  }
  function closeSidebar() {
    sidebar.opened = false;
  }
  function toggleSidebar() {
    sidebar.opened = !sidebar.opened;
  }

  function changeScreenWidthType(type: ScreenWidthType) {
    screen.widthType = type;
  }

  return {
    sidebar,
    screen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    changeScreenWidthType,
  };
});

const appStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { appStoreHook };
