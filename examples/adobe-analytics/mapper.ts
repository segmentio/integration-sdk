import { Track, Page } from '../../lib/facade'
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
    const properties = event.properties

    return _.deepReduce<ContextData>(properties, (accumulator, value, key) => {
      if (typeof value === 'string' || typeof value === 'number') {
        accumulator[key] = value
      }

      if (Array.isArray(value)) {
        accumulator[key] = value.join('|')
      }

      return accumulator
    })
  }
}
