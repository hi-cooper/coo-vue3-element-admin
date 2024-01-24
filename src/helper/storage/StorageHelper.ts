const StorageHelper = {
  encrypt<T>(value: T): string {
    return JSON.stringify(value);
  },

  decrypt<T>(value: string): T {
    return JSON.parse(value) as T;
  },
};

export default StorageHelper;
