import type { Router } from 'vue-router';
import PermissionGuard from './PermissionGuard';

function setup(router: Router) {
  router.beforeEach(async (to, from, next) => {
    let nextPath = null;

    nextPath = PermissionGuard.validate(to, from);
    if (null != nextPath) {
      next({ path: nextPath });
      return;
    }

    next();
  });
}

const RouterGuard = {
  setup,
};

export default RouterGuard;
