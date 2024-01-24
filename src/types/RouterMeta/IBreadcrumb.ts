declare type IBreadcrumb = IBreadcrumbRouteMode | IBreadcrumbMenuItemMode | IBreadcrumbFreeMode;

enum IBreadcrumbMode {
  RouteMode,
  MenuItemMode,
  FreeMode,
}

interface IBreadcrumbRaw {
  id: string; // 全局唯一标识
  title: string; // 显示文本
  path?: string; // url。若非空，则会生成<a href="path" />
  child?: IBreadcrumbRaw; // 子节点
}

interface IBreadcrumbRouteMode {
  mode?: IBreadcrumbMode.RouteMode;
  title: string;
  path?: string; // 对于祖先级Route，可以设置生成<a />的path
}

interface IBreadcrumbMenuItemMode {
  mode: IBreadcrumbMode.MenuItemMode;
  title: string; // 显示文本
  menuPath: string; // menu的path值
  parents?: IBreadcrumbRaw;
}

interface IBreadcrumbFreeMode {
  mode: IBreadcrumbMode.FreeMode;
  title: string;
  parents?: IBreadcrumbRaw;
}

export { IBreadcrumbMode };
export type { IBreadcrumb, IBreadcrumbRouteMode, IBreadcrumbMenuItemMode, IBreadcrumbFreeMode, IBreadcrumbRaw };
