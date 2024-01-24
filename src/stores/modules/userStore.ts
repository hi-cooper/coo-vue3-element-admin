import { defineStore } from 'pinia';
import { ref } from 'vue';
import { store } from '../StoreService';
import SessionStorageKeys from '@/settings/system/SessionStorageKeys';
import type { TokenCreateResponse } from '@/api/HttpApi/modules/token/types';
import SessionStorageHelper from '@/helper/storage/SessionStorageHelper';

const useStore = defineStore('UserStore', () => {
  // state
  const openId = ref<string>('user_open_id');
  const nickname = ref<string>('user_nickname');
  const avatar = ref<string>('user_avatoar');

  // actions
  function updateNickname(val: string): void {
    nickname.value = val;
  }

  function isLogin(): boolean {
    const token = SessionStorageHelper.get<{ createTime: number; data: TokenCreateResponse }>(SessionStorageKeys.token);
    if (null == token || null == token.data) {
      return false;
    }

    const now = new Date().getTime();
    const tmp = now < token.createTime + token.data.expires_in * 1000;
    return tmp;
  }

  function updateToken(value: TokenCreateResponse | null, createTime?: Date) {
    SessionStorageHelper.set(SessionStorageKeys.token, {
      createTime: createTime ? createTime.getTime() : new Date().getTime(),
      data: value,
    });
  }

  function logout(): void {
    SessionStorageHelper.clear();
  }

  return {
    openId,
    nickname,
    avatar,
    updateNickname,
    isLogin,
    updateToken,
    logout,
  };
});

const userStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { userStoreHook };
