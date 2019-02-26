import { BaseContext } from '../common'
import * as Spec from '../../../spec/context/server'
import {
  App,
  Device,
  Network,
  OS
} from '../mobile'
import {
  Campaign,
  Window
} from '../web'

export class Server extends BaseContext<Spec.Server> implements Spec.Server {
  public app: App
  public device: Device
  public network: Network
  public os: OS
  public campaign: Campaign
  public page: Window
  constructor(properties: Spec.Server) {
    super(properties)
    this.app = new App(this.toJSON().app)
    this.device = new Device(this.toJSON().device)
    this.network = new Network(this.toJSON().network)
    this.os = new OS(this.toJSON().os)
    this.campaign = new Campaign(this.toJSON().campaign)
    this.page = new Window(this.toJSON().page)
  }
}
