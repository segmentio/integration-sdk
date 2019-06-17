import { EventNotSupported, InvalidEventPayload, ValidationError } from '../errors'
import { SpecEventMap, SpecEvent } from './spec-event-map'
import { Track, Identify, Group, Page } from '@segment/facade'
import * as Spec from '@segment/spec/events'
import { EventHandler, EventName } from './types'

export class Integration {
  public settings: object
  public subscriptions = new Map<string, EventHandler<SpecEvent>>()
  private specEventMap: SpecEventMap

  constructor(settings: object) {
    this.settings = settings
    this.specEventMap = new SpecEventMap()
  }

  public subscribe<T extends SpecEvent>(name: EventName<SpecEventMap, T>, handler: EventHandler<T>) {
    if (!this.specEventMap[name]) {
      throw new Error(`Event name ${name} is not a supported subscription.`)
    }
    this.subscriptions.set(name, handler.bind(this))
  }

  public reject(message: string): InvalidEventPayload {
    return new ValidationError(message)
  }

  async track(event: Track): Promise<any> {
    return new EventNotSupported('track')

  }

  async identify(event: Identify): Promise<any> {
    return new EventNotSupported('identify')
  }

  async page(event: Page): Promise<any> {
    return new EventNotSupported('page')
  }

  async group(event: Group): Promise<any> {
    return new EventNotSupported('group')
  }

  public async handle(payload: object): Promise<any> {
    if (!this.isSegmentEvent(payload)) {
      return new InvalidEventPayload()
    }
    // Introducing a new variable here is a TS requirement for Discriminiated Unions to work with TypeGuards.
    // See: https://github.com/Microsoft/TypeScript/issues/13962
    const event = payload
    try {
      if (event.type === 'track') {
        const subscription = this.subscriptions.get(event.event)
        if (subscription) {
          const SpecFacade = this.specEventMap[event.event]
          const facade = new SpecFacade(event)
          return await subscription(facade)
        }
        return await this.track(new Track(event))
      }

      if (event.type === 'identify') {
        return await this.identify(new Identify(event))
      }

      if (event.type === 'group') {
        return await this.group(new Group(event))
      }

      if (event.type === 'page') {
        return await this.page(new Page(event))
      }
      // This line should not be reachable but must be defined for TS exhaustiveness checks.
      throw new Error(`Could not recognize event type ${event!.type}`)
    } catch (e) {
      if (e.statusCode) {
        return e
      }
      throw e
    }
  }

  // TODO: Migrate this to a schema validator.
  private isSegmentEvent(
    event: object
  ): event is Spec.Track | Spec.Identify | Spec.Page | Spec.Group {
    const eventTypes = ['track', 'identify', 'group', 'page']
    if (event['type'] && eventTypes.includes(event['type'])) {
      return true
    } else {
      return false
    }
  }
}
