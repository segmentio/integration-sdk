import * as _ from 'lodash'

type ValueOf<T> = T[keyof T];

interface LoDashMixins extends _.LoDashStatic {
  deepReduce<T extends object>(obj: object, iteratee: (accumulator: T, value: unknown, key: string) => T): T
  deepFilter<T extends object>(obj: object, predicate: (value: unknown) => value is ValueOf<T>): T
}

function deepFilter<T extends object>(obj: object, predicate: (value: unknown) => value is ValueOf<T>): T {
  const result = {} as T
  for (let key in obj) {
    const value = obj[key]
    if (_.isPlainObject(value)) {
      result[key] = deepFilter(value, predicate)
    } else {
      if(predicate(value)) {
        result[key] = value
      }
    }
  }
  return result
}

function deepReduce<T extends object>(obj: object, iteratee: (accumulator: T, value: unknown, key: string) => T): T {
  const result = {} as T
  for (let key in obj) {
    const value = obj[key]
    _.isPlainObject(value) ? result[key] = deepReduce(value, iteratee) : iteratee(result, value, key)
  }
  return result
}

_.mixin({
  deepReduce,
  deepFilter
})

export default <LoDashMixins>_
