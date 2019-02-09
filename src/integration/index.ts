import { Track, Identify, SpecEvents } from '../facade/methods'
import { Facade } from '../facade/src'
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
  private static validations: ((event: Track) => void)[]
  static reject() {}
  static validate() {}
  public subscriptions = new Map<string, EventHandler>()

  static ensure(handler: (event: Track | Identify) => void) {
    Integration.validations.push(handler)
  }

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
