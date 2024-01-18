export type Id = number | string;

export interface Item {
  id: Id;
  parent: Id;
  [key: string]: any;
}

export interface TreeNode {
  item: Item | null;
  parentId: Id | null;
  childrenIds: Id[];
}
