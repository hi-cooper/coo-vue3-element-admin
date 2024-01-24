// /src/utils/storage/SessionStorageUtil.ts

import SessionStorageUtil from '@/utils/storage/SessionStorageUtil';
import StorageHelper from './StorageHelper';

const SessionStorageHelper = {
  /**
   * 设置指定key的缓存。<br />
   * 通过JSON.stringify()转换成string后再存储
   *
   * @param key key
   * @param value value
   */
  set<T>(key: string, value: T): void {
    SessionStorageUtil.set(key, StorageHelper.encrypt(value));
  },

  /**
   * 获取指定key的缓存。
   *
   * @param key key
   * @param defaultValue 默认值
   * @returns null - 未取到数据<br />
   * JSON - 取到的JSON的值
   */
  get<T>(key: string, defaultValue?: T): T | null {
    const value = SessionStorageUtil.get(key, null);
    if (null != value) {
      return StorageHelper.decrypt<T>(value);
    }

    return defaultValue ?? null;
  },

  /**
   * 移除指定key的缓存
   *
   * @param key key
   */
  remove(key: string): void {
    SessionStorageUtil.remove(key);
  },

  /**
   * 移除全部缓存
   */
  clear(): void {
    SessionStorageUtil.clear();
  },

  /**
   * 获取所有key
   *
   * @returns
   */
  getAllKeys(): string[] {
    return SessionStorageUtil.getAllKeys();
  },
};

export default SessionStorageHelper;
