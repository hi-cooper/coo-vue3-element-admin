import { defineStore } from 'pinia';
import { store } from '../StoreService';
import RouterService from '@/router/RouterService';
import { ref } from 'vue';
import type { ITabView } from '@/layouts/default/components/CooTabView/types';

const useStore = defineStore('TabViewStore', () => {
  // state
  const allTabs = ref<ITabView[]>([]);
  const activeTab = ref<string>('');

  // actions
  function init() {
    if (allTabs.value.length === 0) {
      const tab: ITabView = {
        title: '首页',
        path: '/dashboard',
        closable: false,
      };
      addTab(tab);
    }
  }

  function addTab(tab: ITabView) {
    if (_isTabAlreadyExists(tab)) {
      activeTab.value = tab.path;
    } else {
      allTabs.value.push(tab);
      activeTab.value = tab.path;
    }
    RouterService.router.push(activeTab.value);
  }

  function openInCurrentTab(tab: ITabView) {
    if (activeTab.value === tab.path) {
      return;
    }

    if (_isTabAlreadyExists(tab)) {
      activeTab.value = tab.path;
    } else {
      const index = allTabs.value.findIndex((item) => item.path === activeTab.value);
      if (index >= 0) {
        allTabs.value.splice(index, 1);
        allTabs.value.splice(index, 0, tab);
        activeTab.value = tab.path;
      }
    }

    RouterService.router.push(activeTab.value);
  }

  function _isTabAlreadyExists(tab: ITabView) {
    const filters = allTabs.value.filter((item: ITabView) => {
      return item.path === tab.path;
    });

    return filters.length !== 0;
  }

  function removeTab(name: String) {
    const tabs = allTabs.value;
    let activeName = activeTab.value;
    if (activeName === name) {
      tabs.forEach((tab: ITabView, index: number) => {
        if (tab.path === name) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.path;
          }
        }
      });
    }

    activeTab.value = activeName;
    allTabs.value = tabs.filter((tab) => tab.path !== name);
    RouterService.router.replace(activeTab.value);

    init();
  }

  function setActiveTab(name: string) {
    activeTab.value = name;
    RouterService.router.push(activeTab.value);
  }

  return {
    allTabs,
    activeTab,
    init,
    addTab,
    openInCurrentTab,
    removeTab,
    setActiveTab,
  };
});

const tabViewStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { tabViewStoreHook };
