import { Facade } from '../src'
import * as Ecommerce from '../events/ecommerce'
import * as Mobile from '../events/mobile'
import * as Context from '../context'
import { Window } from '../context/web'
import * as Spec from '../../spec/methods'

export interface SpecEvents {
  // eCommerce
  'Order Completed': Ecommerce.OrderCompleted
  'Product List Viewed': Ecommerce.ProductListViewed
  'Product Clicked': Ecommerce.ProductClicked
  'Product Added': Ecommerce.ProductAdded
  'Product List Filtered': Ecommerce.ProductListFiltered
  'Product Removed': Ecommerce.ProductRemoved
  'PromotionClicked': Ecommerce.PromotionClicked
  'Promotion Viewed': Ecommerce.PromotionViewed

  // Mobile
  'Application Installed': Mobile.ApplicationInstalled
  'Application Opened': Mobile.ApplicationOpened
  'Application Backgrounded': Mobile.ApplicationBackgrounded
  'Application Updated': Mobile.ApplicationUpdated
  'Application Uninstalled': Mobile.ApplicationUninstalled
  'Application Crashed': Mobile.ApplicationCrashed
  'Install Attributed': Mobile.InstallAttributed
  'Push Notification Received': Mobile.PushNotificationReceived
  'Push Notification Bounced': Mobile.PushNotificationBounced
  'Deep Link Clicked': Mobile.DeepLinkClicked
  'Deep Link Opened': Mobile.DeepLinkOpened
}

const specEvents = {
  // eCommerce
  'Order Completed': Ecommerce.OrderCompleted,
  'Product List Viewed': Ecommerce.ProductListViewed,
  'Product Clicked': Ecommerce.ProductClicked,
  'Product Added': Ecommerce.ProductAdded,
  'Product List Filtered': Ecommerce.ProductListFiltered,
  'Product Removed': Ecommerce.ProductRemoved,
  'PromotionClicked': Ecommerce.PromotionClicked,
  'Promotion Viewed': Ecommerce.PromotionViewed,

  // Mobile
  'Application Installed': Mobile.ApplicationInstalled,
  'Application Opened': Mobile.ApplicationOpened,
  'Application Backgrounded': Mobile.ApplicationBackgrounded,
  'Application Updated': Mobile.ApplicationUpdated,
  'Application Uninstalled': Mobile.ApplicationUninstalled,
  'Application Crashed': Mobile.ApplicationCrashed,
  'Install Attributed': Mobile.InstallAttributed,
  'Push Notification Received': Mobile.PushNotificationReceived,
  'Push Notification Bounced': Mobile.PushNotificationBounced,
  'Deep Link Clicked': Mobile.DeepLinkClicked,
  'Deep Link Opened': Mobile.DeepLinkOpened
}

function toFacade<T extends Facade>(name: string, properties: object) {
  const SpecFacade = specEvents[name]
  if (SpecFacade) {
    return new SpecFacade(properties) as T
  }
  return new Facade(properties) as T
}

function contextFactory(context: any): Context.Mobile | Context.Web | Context.Server {
  if (typeof context === 'object' && context != null) {
    if (context.channel === 'web') {
      return new Context.Web(context)
    }

    if (context.channel === 'mobile') {
      return new Context.Mobile(context)
    }

    if (context.channel === 'server') {
      return new Context.Server(context)
    }
  }
  context.channel = 'server'
  return new Context.Server(context)
}

class Message extends Facade<Spec.BasePayload> implements Spec.BasePayload {
  public context: Context.Mobile | Context.Web | Context.Server
  public type: Spec.Methods
  constructor(event: Spec.BasePayload) {
    super(event)
    this.type = event.type
    this.context = contextFactory(event.context)
  }

  get userId() {
    const userId = this.toJSON().userId || this.toJSON().user_id
    return this.enforce.stringOrNumber(userId)
  }

  get timestamp() {
    return this.toJSON().timestamp
  }

  get messageId() {
    return this.toJSON().messageId
  }

  get receivedAt() {
    return this.toJSON().receivedAt
  }

  get anonymousId() {
    return this.toJSON().anonymousId
  }

  get sentAt() {
    return this.toJSON().sentAt
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

export class Page extends Message implements Spec.Page {
  public properties: Window
  public type: 'page'
  constructor(event: Spec.Page) {
    super(event)
    this.type = event.type
    this.properties = new Window(event.properties)
  }
}

class Company extends Facade<Spec.Company> {
  get name() {
    return this.toJSON().name
  }

  get industry() {
    return this.toJSON().industry
  }

  get employees() {
    return this.toJSON().employees
  }

  get plan() {
    return this.toJSON().plan
  }

  get totalBilled() {
    return this.enforce.number(this.toJSON().totalBilled || this.toJSON().total_billed || this.toJSON()['total billed']) as Spec.Company["totalBilled"]
  }
}

export class Group extends Message implements Spec.Group {
  public type: 'group'
  public traits: Company
  constructor(event: Spec.Group) {
    super(event)
    this.type = 'group'
    this.traits = new Company(event.traits)
  }
}
