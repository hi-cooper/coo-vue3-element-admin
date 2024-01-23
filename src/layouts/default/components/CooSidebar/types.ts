declare type IMenuItem = ISubMenuRaw | IMenuItemRaw | IMenuItemDisabledRaw;

interface IMenuItemRaw extends IBaseMenu {
  path: string;
  children?: never;
}

interface IMenuItemDisabledRaw extends IBaseMenu {
  path?: string;
  children?: never;
  disabled: true;
}

interface ISubMenuRaw extends IBaseMenu {
  path?: never;
  isTab?: never;
  children: IMenuItem[];
}

interface IBaseMenu {
  id: string; // id，全局唯一
  title: string; // 显示标题
  path?: string; // url（绝对路径，最终route path，即不能是redirect前的route path）。支持外链
  icon?: string; // 菜单图标。icon路径。根目录为”/src/assets“
  visiable?: boolean; // 是否显示。true-是；false-否；
  browser?: boolean; // 是否浏览器打开。true-是；false-否（即系统标签页打开）；默认false
  newTab?: boolean; // 是否在新标签页打开。true-是；false-否。默认true
  disabled?: boolean; // 是否禁用。true-是；false-否。默认false
  tabClosable?: boolean; // tab标签页是否可关闭。true-是；false-否。默认true
  children?: IMenuItem[];
}

export type { IMenuItem, ISubMenuRaw, IMenuItemRaw };
