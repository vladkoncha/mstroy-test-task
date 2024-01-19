import { describe, expect, test } from "@jest/globals";
import { TreeStore } from "../src/tree-store";

describe("TreeStore", () => {
  const items = [
    { id: 2, parent: 1, type: "test" },
    { id: 1, parent: "root" },
    { id: 5, parent: 2, type: "test" },
    { id: 3, parent: 1, type: "test" },
    { id: 6, parent: 2, type: "test" },
    { id: 4, parent: 2, type: "test" },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
  ];

  const ts = new TreeStore(items);

  describe("getAll()", () => {
    test("Возвращает изначальный массив элементов", () => {
      expect(ts.getAll()).toBe(items);
    });
  });

  describe("getItem(id)", () => {
    test("Возвращает сам объект элемента", () => {
      expect(ts.getItem(2)).toBe(items.find((item) => item.id === 2));
    });

    test("Возвращает undefined, если объекта с id нет в TreeStore", () => {
      expect(ts.getItem(200)).toBe(undefined);
    });
  });

  describe("getChildren(id)", () => {
    test("Возвращает массив дочерних элементов.", () => {
      const children = [
        { id: 5, parent: 2, type: "test" },
        { id: 6, parent: 2, type: "test" },
        { id: 4, parent: 2, type: "test" },
      ];
      expect(ts.getChildren(2)).toEqual(children);
    });

    test("Возвращает массив дочерних элементов для root-а.", () => {
      const rootChildren = [{ id: 1, parent: "root" }];
      expect(ts.getChildren("root")).toEqual(rootChildren);
    });

    test("Если у элемента нет дочерних, то возвращает пустой массив", () => {
      expect(ts.getChildren(8)).toEqual([]);
    });

    test("Возвращает undefined, если объекта с id нет в TreeStore", () => {
      expect(ts.getChildren(200)).toBe(undefined);
    });
  });

  describe("getAllChildren(id)", () => {
    test("Возвращает массив дочерних элементов и их дочерних элементов.", () => {
      const children = [
        { id: 1, parent: "root" },
        { id: 2, parent: 1, type: "test" },
        { id: 3, parent: 1, type: "test" },
        { id: 5, parent: 2, type: "test" },
        { id: 6, parent: 2, type: "test" },
        { id: 4, parent: 2, type: "test" },
        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
      ];
      expect(ts.getAllChildren("root")).toEqual(children);
    });

    test("Возвращает массив дочерних элементов и их дочерних элементов для root-а.", () => {
      const children = [
        { id: 5, parent: 2, type: "test" },
        { id: 6, parent: 2, type: "test" },
        { id: 4, parent: 2, type: "test" },
        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
      ];
      expect(ts.getAllChildren(2)).toEqual(children);
    });

    test("Если у элемента нет дочерних, то возвращает пустой массив", () => {
      expect(ts.getAllChildren(8)).toEqual([]);
    });

    test("Возвращает undefined, если объекта с id нет в TreeStore", () => {
      expect(ts.getAllChildren(200)).toBe(undefined);
    });
  });

  describe("getAllParents(id)", () => {
    test("Возвращает массив из цепочки родительских элементов, начиная от самого элемента, чей id был передан в аргументе и до корневого элемента", () => {
      const parents = [
        { id: 4, parent: 2, type: "test" },
        { id: 2, parent: 1, type: "test" },
        { id: 1, parent: "root" },
      ];
      expect(ts.getAllParents(8)).toEqual(parents);
    });

    test("Если у элемента родитель — root, то возвращает пустой массив", () => {
      expect(ts.getAllParents(1)).toEqual([]);
    });

    test("Возвращает undefined, если объекта с id нет в TreeStore", () => {
      expect(ts.getAllParents(200)).toBe(undefined);
    });
  });
});
