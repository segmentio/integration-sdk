import { Facade } from '../src'
import * as Spec from '@segment/spec/events'
import { App, Device, Network, OS } from '../types/mobile'
import { Campaign, Window } from '../types/web'

export class Context extends Facade<Spec.Context> implements Spec.Context {
  public app: App
  public device: Device
  public network: Network
  public os: OS
  public campaign: Campaign
  public page: Window

  constructor(properties: any) {
    super(properties)
    this.app = new App(this.getProperties().app)
    this.device = new Device(this.getProperties().device)
    this.network = new Network(this.getProperties().network)
    this.os = new OS(this.getProperties().os)
    this.campaign = new Campaign(this.getProperties().campaign)
    this.page = new Window(this.getProperties().page)
  }

  get ip() {
    return this.enforce.string(this.getProperties().ip)
  }

  get locale() {
    return this.enforce.string(this.getProperties().locale)
  }

  get userAgent() {
    return this.enforce.string(this.getProperties().userAgent || this.getProperties().user_agent as Spec.Context["userAgent"])
  }
}

export class Message extends Facade<Spec.Message> implements Spec.Message {
  public context: Context
  public type: Spec.Events
  constructor(event: Spec.Message) {
    super(event)
    this.type = event.type
    this.context = new Context(this.getProperties().context)
  }

  get userId() {
    return this.enforce.stringOrNumber(this.getProperties().userId || this.getProperties().user_id as Spec.Message["userId"])
  }

  get timestamp() {
    return this.getProperties().timestamp
  }

  get messageId() {
    return this.getProperties().messageId
  }

  get receivedAt() {
    return this.getProperties().receivedAt
  }

  get anonymousId() {
    return this.enforce.stringOrNumber(this.getProperties().anonymousId)
  }

  get sentAt() {
    return this.getProperties().sentAt
  }
}
