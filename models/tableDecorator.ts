/* eslint-disable @typescript-eslint/no-explicit-any */
type Constructor<T = any> = new (...args: any[]) => T;
type Field = string;
export enum Keys {
  PK = 'pk',
  SK = 'sk',
}

export const tableMap = new Map<Constructor, string>();
export const keyMap = new Map<Constructor, Map<Keys, Field>>();

export function Table(tableName: string) {
  return (Class: Constructor) => {
    tableMap.set(Class, tableName);
  };
}

export const pk = addKey(Keys.PK);
export const sk = addKey(Keys.SK);

export function addKey(key: Keys) {
  return (Clazz: any, field: Field) => {
    const map = keyMap.get(Clazz.constructor) ?? new Map<Keys, Field>();
    map.set(key, field);
    keyMap.set(Clazz.constructor, map);
  };
}
