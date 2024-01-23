import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
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
  const isFullContent = ref<Boolean>(false);

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

  function setScreenWidthType(type: ScreenWidthType) {
    screen.widthType = type;
    switch (screen.widthType) {
      case ScreenWidthType.Big:
        openSidebar();
        isFullContent.value = false;
        break;
      case ScreenWidthType.Middle:
        isFullContent.value = false;
        closeSidebar();
        break;
      case ScreenWidthType.Small:
        isFullContent.value = false;
        closeSidebar();
        break;
    }
  }

  function toggleFullContent() {
    isFullContent.value = !isFullContent.value;
  }

  return {
    sidebar,
    screen,
    isFullContent,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    setScreenWidthType,
    toggleFullContent,
  };
});

const appStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { appStoreHook };
