import { TreeStore } from "./tree-store";

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

console.log(ts.getAll());
console.log(ts.getItem(2));
console.log(ts.getChildren(88));
console.log(ts.getAllParents(6));
