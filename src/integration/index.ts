import { Track, Identify, Group, Page } from '../../lib/facade/events'
import { IntegrationResponse, EventNotSupported } from './responses'
import { toFacade, SpecEvents } from './to-facade'
import { Facade } from '../../lib/facade/src'
import * as Spec from '@segment/spec/events'

type Filter<Base, Condition> = {
  [Key in keyof Base]:
    Base[Key] extends Condition ? Key : never
}

type EventName<T extends Facade> = Filter<SpecEvents, T>[keyof SpecEvents]

interface EventHandler<T = any> {
  (event: T, options?: object): Promise<IntegrationResponse>
}

export abstract class Integration {
  public abstract settings: object
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

  public async handle(event: Spec.Track | Spec.Identify | Spec.Page | Spec.Group): Promise<IntegrationResponse> {
    if (event.type === 'track') {
      const subscription = this.subscriptions.get(event.event)
      if (subscription) {
        const facade = toFacade(event.event, event.properties)
        if (!facade) {
          throw new Error()
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
    throw new Error(`Could not recognize event type ${event!.type}`)
  }
}
