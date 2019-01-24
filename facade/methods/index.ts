import { Facade } from '../src'
import { OrderCompleted, ProductListViewed } from '../spec/ecommerce'
import { User } from '../spec/types'
import { Mobile, Web } from '../context'
import { EventPayload, IdentifyPayload, TrackPayload } from '../../server'

export class SpecEvents {
  'Order Completed' = OrderCompleted
  'Product List Viewed' = ProductListViewed
}

export function toFacade<T extends Facade>(name: string, properties: object) {
  const specEvents = new SpecEvents()
  const SpecFacade = specEvents[name]
  if (SpecFacade) {
		return new SpecFacade(properties) as T
	}
	return new Facade(properties) as T
}

class Message extends Facade {
  public context: Mobile | Web
  constructor(event: EventPayload) {
    super(event)
    const channel = event.context.channel
    if (channel === 'web') {
      this.context = new Web(event.context)
    } else {
      this.context = new Mobile(event.context)
    }
  }

  get timestamp() {
    return this.toJSON().timestamp
  }
}

export class Track<T extends Facade = Facade> extends Message {
  public properties: T
  public name: string
  constructor(event: TrackPayload) {
      super(event)
      this.name = event.name
      this.properties = toFacade(event.name, event.properties)
  }
}

export class Identify extends Message {
  public traits: User
  constructor(event: IdentifyPayload) {
    super(event)
    this.traits = new User(event.traits)
  }
}
