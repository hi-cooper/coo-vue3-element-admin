// /src/utils/storage/LocalStorageUtil.ts

import LocalStorageUtil from '@/utils/storage/LocalStorageUtil';
import StorageHelper from './StorageHelper';

/**
 * 采用window.localStorage
 */
const LocalStorageHelper = {
  /**
   * 设置指定key的缓存。<br />
   * 通过JSON.stringify()转换成string后再存储
   *
   * @param key key
   * @param value value
   */
  set<T>(key: string, value: T): void {
    LocalStorageUtil.set(key, StorageHelper.encrypt(value));
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
    const value = LocalStorageUtil.get(key, null);
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
    LocalStorageUtil.remove(key);
  },

  /**
   * 移除全部缓存
   */
  clear(): void {
    LocalStorageUtil.clear();
  },

  /**
   * 获取所有key
   *
   * @returns
   */
  getAllKeys(): string[] {
    return LocalStorageUtil.getAllKeys();
  },
};

export default LocalStorageHelper;
