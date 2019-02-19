import { Track, Identify, SpecEvents } from '../../packages/facade/methods'
import { Facade } from '../../packages/facade'
import { IntegrationResponse, EventNotSupported } from './responses'

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
}
