import { Facade } from '../src'
import {
  OrderCompleted,
  ProductListViewed,
  ProductClicked,
  ProductAdded,
  ProductListFiltered,
  ProductRemoved,
  PromotionClicked,
  PromotionViewed
} from '../events/ecommerce'
import { Mobile, Web } from '../context'
import * as Spec from '../../spec/methods'

export interface SpecEvents {
  'Order Completed': OrderCompleted
  'Product List Viewed': ProductListViewed
  'Product Clicked': ProductClicked
  'Product Added': ProductAdded
  'Product List Filtered': ProductListFiltered
  'Product Removed': ProductRemoved
  'PromotionClicked': PromotionClicked
  'Promotion Viewed': PromotionViewed
}

const specEvents = {
  'Order Completed': OrderCompleted,
  'Product List Viewed': ProductListViewed,
  'Product Clicked': ProductClicked,
  'Product Added': ProductAdded,
  'Product List Filtered': ProductListFiltered,
  'Product Removed': ProductRemoved,
  'PromotionClicked': PromotionClicked,
  'Promotion Viewed': PromotionViewed
}

function toFacade<T extends Facade>(name: string, properties: object) {
  const SpecFacade = specEvents[name]
  if (SpecFacade) {
    return new SpecFacade(properties) as T
  }
  return new Facade(properties) as T
}

class Message extends Facade implements Spec.BasePayload {
  public context: Mobile | Web
  public type: Spec.Methods
  constructor(event: Spec.BasePayload) {
    super(event)
    this.type = event.type
    const channel = event.context.channel
    if (channel === 'web') {
      this.context = new Web(event.context)
    } else {
      this.context = new Mobile(event.context)
    }
  }

  get userId() {
    const userId = this.toJSON().userId || this.toJSON().user_id
    return this.enforce.stringOrNumber(userId)
  }

  get timestamp() {
    return this.toJSON().timestamp
  }
}

export class Track<T extends Facade = Facade> extends Message implements Spec.Track {
  public properties: T
  public name: string
  public type: 'track'
  constructor(event: Spec.Track) {
    super(event)
    this.type = event.type
    this.name = event.name
    this.properties = toFacade(event.name, event.properties)
  }
}

class User extends Facade {
  get email() {
    return this.toJSON().email
  }

  get firstName() {
    return this.toJSON().firstName || this.toJSON().first_name
  }

  get lastName() {
    return this.toJSON().lastName || this.toJSON().last_name
  }
}

export class Identify extends Message implements Spec.Identify {
  public traits: User
  public type: 'identify'
  constructor(event: Spec.Identify) {
    super(event)
    this.type = event.type
    this.traits = new User(event.traits)
  }
}
