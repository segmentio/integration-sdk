import { Track, Identify, Group, Page } from '../facade/events'
import { IntegrationResponse, EventNotSupported } from '../responses'
import { toFacade, SpecEvents } from './to-facade'
import { Facade } from '../facade/src'
import * as Spec from '@segment/spec/events'

type Filter<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}

type EventName<T extends Facade> = Filter<SpecEvents, T>[keyof SpecEvents]

interface EventHandler<T = any> {
  (event: T, options?: object): Promise<IntegrationResponse>
}

export abstract class Integration {
  public abstract authToken: string
  public subscriptions = new Map<string, EventHandler>()

  constructor() {}

  subscribe<T extends Track>(name: EventName<T>, handler: EventHandler<T>) {
    this.subscriptions.set(name, handler.bind(this))
  }

  async track(event: Track, options?: object): Promise<IntegrationResponse> {
    return new EventNotSupported('track')
  }

  async identify(event: Identify): Promise<IntegrationResponse> {
    return new EventNotSupported('identify')
  }

  async page(event: Page): Promise<IntegrationResponse> {
    return new EventNotSupported('page')
  }

  async group(event: Group): Promise<IntegrationResponse> {
    return new EventNotSupported('group')
  }

  public async handle(payload: object): Promise<IntegrationResponse> {
    if (!this.isSegmentEvent(payload)) {
      // TODO: Use pre-defined error here.
      throw new Error('Invalid Segment Event Payload')
    }
    // Introducing a new variable here is a TS requirement for Discriminiated Unions to work with TypeGuards.
    // See: https://github.com/Microsoft/TypeScript/issues/13962
    const event = payload
    if (event.type === 'track') {
      const subscription = this.subscriptions.get(event.event)
      if (subscription) {
        const facade = toFacade(event)
        if (!facade) {
          // TODO: Use pre-defined error here.
          throw new Error('Unsupported Spec Event')
        }
        return await subscription(facade, {})
      }
      return await this.track(new Track(event), {})
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
    // TODO: Use pre-defined error.
    throw new Error(`Could not recognize event type ${event!.type}`)
  }

  // TODO: Add more exhaustive checks here.
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
