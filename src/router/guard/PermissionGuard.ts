import type { RouteLocationNormalized } from 'vue-router';
import { userStoreHook } from '@/stores/modules/userStore';
import { RoutePathEnum } from '../RoutePathEnum';
import RouterService from '../RouterService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validate(to: RouteLocationNormalized, from: RouteLocationNormalized): string | null {
  // 目标地址为白名单地址
  if (RouterService.isWhiteList(to.path)) {
    return null;
  }

  // 未登录，跳转到登录页面
  if (!userStoreHook.isLogin()) {
    return RoutePathEnum.LOGIN;
  }

  // 已登录
  if (to.path === RoutePathEnum.LOGIN) {
    return RoutePathEnum.HOME;
  }

  return null;
}

const PermissionGuard = {
  validate,
};

export default PermissionGuard;
