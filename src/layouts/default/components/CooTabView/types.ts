interface ITabView {
  //   name?: string; // 选项卡名称（可选）。默认等于path
  title: string; // 选项卡标题
  path: string; // 选项卡对应的router-view path
  closable: boolean; // 是否可关闭
}

export type { ITabView };
