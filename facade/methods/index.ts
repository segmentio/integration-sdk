import { Facade } from '../src'
import { OrderCompleted, ProductListViewed } from '../spec/ecommerce'
import { User } from '../spec/types'

export class SpecEvents {
  'Order Completed': OrderCompleted
  'Product List Viewed': ProductListViewed
}

export function toFacade<T extends Facade>(name: string, properties: object) {
	const SpecFacade = (SpecEvents as any | null)[name]
  if (SpecFacade) {
		return new SpecFacade(properties) as T
	}
	return new Facade(properties) as T
}

class Message extends Facade {
  constructor(event: any) {
    super(event)
  }

  get timestamp() {
    return this.toJSON().timestamp
  }
}

export class Track<T extends Facade = Facade> extends Message {
  public properties: T
  public name: string
  constructor(event: { name: string, properties: object }) {
      super(event)
      this.name = event.name
      this.properties = toFacade(event.name, event.properties)
  }
}

export class Identify extends Message {
  public traits: User
  constructor(event: any) {
    super(event)
    this.traits = new User(event.traits)
  }
}
