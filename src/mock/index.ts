import Mock from 'mockjs';
import type { IMockParam } from './types';

const modules = import.meta.glob<Record<string, unknown>>('./modules/**/*.ts', { eager: true });
const allMockApis: IMockParam[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}; // 仅支持export default
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  allMockApis.push(...modList);
});

// 设置200-600毫秒延时请求数据
Mock.setup({
  timeout: '200-600',
});

for (const api of allMockApis) {
  Mock.mock(new RegExp(api.url), api.method || 'get', api.response);
}
