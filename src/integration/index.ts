import { Track, Identify, SpecEvents, Page, Group } from '../../lib/facade/methods'
import { Facade } from '../../lib/facade'
import { IntegrationResponse, EventNotSupported } from './responses'
import * as Spec from '../../lib/spec/methods'

type Filter<Base, Condition> = {
  [Key in keyof Base]:
    Base[Key] extends Condition ? Key : never
}

type EventName<T extends Facade> = Filter<SpecEvents, T>[keyof SpecEvents]

interface EventHandler {
  (event: Track<any>): Promise<IntegrationResponse>
}

export abstract class Integration {
  public subscriptions = new Map<string, EventHandler>()

  subscribe<T extends Facade>(name: EventName<T>, handler: EventHandler) {
    this.subscriptions.set(name, handler.bind(this))
  }

  async track(event: Track): Promise<IntegrationResponse> {
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
      const subscription = this.subscriptions.get(event.name)
      if (subscription) {
        return await subscription(new Track(event))
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
  }
}
