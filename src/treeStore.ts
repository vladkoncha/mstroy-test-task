import { Id, Item } from "./types";

class TreeStore<T> {
  constructor(items: Item<T>[]) {}

  /**
   * Возвращает изначальный массив элементов
   */
  getAll() {}

  /**
   * Принимает id элемента и возвращает объект элемента
   * @param {Id} id
   */
  getItem(id: Id) {}

  /**
   * Принимает id элемента и возвращает массив элементов,
   * являющихся дочерними для того элемента, чей id получен в аргументе.
   * Если у элемента нет дочерних, то возвращает пустой массив.
   * @param {Id} id
   */
  getChildren(id: Id) {}

  /**
   * Принимает id элемента и возвращает массив элементов,
   * являющихся прямыми дочерними элементами того, чей id получен в аргументе.
   * 
   * Если у них в свою очередь есть еще дочерние элементы,
   * они все тоже будут включены в результат, и так до самого глубокого уровня.
   * @param {Id} id
   */
  getAllChildren(id: Id) {}

  /**
   * Принимает id элемента и возвращает массив из цепочки родительских элементов,
   * начиная от самого элемента, чей id был передан в аргументе и до корневого элемента.
   * @param {Id} id
   */
  getAllParents(id: Id) {}
}
