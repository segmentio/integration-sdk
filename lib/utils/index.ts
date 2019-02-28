import * as _ from 'lodash'
import { DeepPartial } from 'ts-essentials'

type ValueOf<T> = T[keyof T];

interface LoDashMixins extends _.LoDashStatic {
  isObject(value: any): value is object
  deepReject<T extends object>(obj: T): DeepPartial<T>
}

function isObject(value: any): value is object {
  return typeof value === 'function' || (typeof value === 'object' && !!value);
}

function deepReject<T extends object>(obj: T): DeepPartial<T> {
  const result = Object.create({})

  for (let key in obj) {
    const value = obj[key]

    if (isObject(value)) {
      result[key] = deepReject(value)
      continue
    }

    if (value !== undefined && value !== null) {
      result[key] = value
    }
  }

  return result
}

_.mixin({
  isObject,
  deepReject
})

export default <LoDashMixins>_
