import 'vue-router';
import type { IBreadcrumb } from './IBreadcrumb';

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumb?: IBreadcrumb;
  }
}
