export type Id = number | string;

export interface Item<T> {
    id: number | string;
    parent: Item<T>;
    type: T;
}

