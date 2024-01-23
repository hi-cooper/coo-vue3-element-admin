interface ITabView {
  title: string; // 选项卡标题
  path: string; // 选项卡对应的router-view path
  closable: boolean; // 是否可关闭
}

export type { ITabView };
