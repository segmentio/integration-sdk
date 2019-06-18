import { Message } from '@segment/spec-ts/events';
export type ValueOf<T> = T[keyof T];

export type Filter<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}

export type EventName<EventMap, T extends Message> = Filter<EventMap, T>[keyof EventMap]
