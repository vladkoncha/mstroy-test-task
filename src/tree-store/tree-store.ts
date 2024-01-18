import { Id, Item, TreeNode } from "./types";

export class TreeStore {
  readonly initialArray: Item[];
  readonly itemsMap: Map<Id, TreeNode>;

  #initTree = () => {
    const itemsMap = new Map<Id, TreeNode>();

    this.initialArray.forEach((item) => {
      if (!itemsMap.has(item.id)) {
        itemsMap.set(item.id, {
          childrenIds: [],
          parentId: item.parent,
          item,
        });
      } else {
        const node = itemsMap.get(item.id);
        node.item = item;
        node.parentId = item.parent;
      }

      if (itemsMap.has(item.parent)) {
        itemsMap.get(item.parent).childrenIds.push(item.id);
      } else {
        itemsMap.set(item.parent, {
          childrenIds: [item.id],
          parentId: null,
          item: null,
        });
      }
    });

    return itemsMap;
  };

  constructor(items: Item[]) {
    this.initialArray = items;
    this.itemsMap = this.#initTree();
  }

  /**
   * Возвращает изначальный массив элементов
   */
  getAll() {
    return this.initialArray;
  }

  /**
   * Принимает id элемента и возвращает объект элемента
   * @param {Id} id
   */
  getItem(id: Id): Item | undefined {
    return this.itemsMap.get(id)?.item;
  }

  /**
   * Принимает id элемента и возвращает массив элементов,
   * являющихся дочерними для того элемента, чей id получен в аргументе.
   * Если у элемента нет дочерних, то возвращает пустой массив.
   * @param {Id} id
   */
  getChildren(id: Id): Item[] | undefined {
    return this.itemsMap
      .get(id)
      ?.childrenIds.map((id) => this.itemsMap.get(id).item);
  }

  /**
   * Принимает id элемента и возвращает массив элементов,
   * являющихся прямыми дочерними элементами того, чей id получен в аргументе.
   *
   * Если у них в свою очередь есть еще дочерние элементы,
   * они все тоже будут включены в результат, и так до самого глубокого уровня.
   * @param {Id} id
   */
  getAllChildren(id: Id): Item[] | undefined {
    const children = this.getChildren(id);
    if (!children) {
      return undefined;
    }

    const queue = [...children];
    const items = [];

    while (queue.length) {
      const item = queue.shift();

      items.push(item);
      queue.push(...this.getChildren(item.id));
    }

    return items;
  }

  /**
   * Принимает id элемента и возвращает массив из цепочки родительских элементов,
   * начиная от самого элемента, чей id был передан в аргументе и до корневого элемента.
   * @param {Id} id
   */
  getAllParents(id: Id): Item[] | undefined {
    let currentItem = this.itemsMap.get(id)?.item;
    if (!currentItem) {
      return undefined;
    }

    const parentsChain = [];
    do {
      parentsChain.push(currentItem);
      currentItem = this.itemsMap.get(currentItem.parent)?.item;
    } while (currentItem);

    return parentsChain;
  }
}
