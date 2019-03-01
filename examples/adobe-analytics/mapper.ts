import { Track, Page } from '../../lib/facade/events'
import { Payload, ContextData } from './types'
import _ from '../../lib/utils'

export class Mapper {
  track(event: Track): Payload {
    return this.map(event)
  }

  private map(event: Track | Page): Payload {
    return {
      contextData: this.mapContextData(event)
    }
  }

  private mapContextData(event: Track | Page): ContextData {
    const properties = event.properties.toJSON()

    function iterator(accumulator: ContextData, value: unknown, key: string): ContextData {
      if (_.isObject(value)) {
        accumulator[key] = _.transform(value, iterator)
        return accumulator
      }

      if (typeof value === 'string' || typeof value === 'number') {
        accumulator[key] = value
      }

      if (Array.isArray(value)) {
        accumulator[key] = value.join('|')
      }

      return accumulator
    }

    return _.transform(properties, iterator)
  }
}
