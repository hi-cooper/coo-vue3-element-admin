import type { RouteRecordRaw } from 'vue-router';

const modules = import.meta.glob<Record<string, unknown>>('./modules/**/*.ts', { eager: true });
const allRoutes: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}; // 仅支持export default
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    allRoutes.push(...modList);
});

export default allRoutes;
