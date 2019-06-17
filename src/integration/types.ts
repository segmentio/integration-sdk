import { SpecEventMap } from './spec-event-map'
export type ValueOf<T> = T[keyof T];

export type Filter<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}

export type EventName<EventMap, T extends ValueOf<EventMap>> = Filter<EventMap, T>[keyof EventMap]

export interface EventHandler<T extends ValueOf<SpecEventMap>> {
  (event: InstanceType<T>): Promise<any>
}
