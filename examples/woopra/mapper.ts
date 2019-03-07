import { Track, Identify } from '../../src/facade/events';
import { BasePayload, WoopraEvent, WoopraIdentify } from './types';
import { Settings } from './integration';
import _ from '../../src/utils'

export class Mapper {
  constructor(private settings: Settings) {}

  customEvent(event: Track): WoopraEvent {
    return {
      ...this.basePayload(event),
      ...this.mapCustomEventProperties(event),
      event: event.event,
      timestamp: event.timestamp,
      os: event.context.os.name,
      device: event.context.device.type
    }
  }

  identify(event: Identify): WoopraIdentify {
    return {
      ...this.basePayload(event),
      ...this.mapCustomUserProperties(event)
    }
  }

  private mapCustomEventProperties(event: Track): { [key: string]: any } {
    const properties = event.properties.toJSON()

    // Woopra requires all custom event properties be prefixed with `ce_`
    // See: https://docs.woopra.com/reference#section-custom-data-property-prefixes-ce_-cv_-and-cs_-
    return _.mapKeys(properties, (value, key) => `ce_${key}`)
  }

  private mapCustomUserProperties(event: Identify) {
    const traits = event.traits.toJSON()
    // Woopra requires all custom event properties be prefixed with `cv_`
    // See: https://docs.woopra.com/reference#section-custom-data-property-prefixes-ce_-cv_-and-cs_-
    return _.mapKeys(traits, (value, key) => `cv_${key}`)
  }

  private basePayload(event: Track | Identify): BasePayload {
    return {
      project: this.settings.domain,
      cookie: event.anonymousId
    }
  }
}
