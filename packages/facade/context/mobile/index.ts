import { Facade } from '../../src'
import { BaseContext } from '../common'
import * as Spec from '../../../spec/context/mobile'

export class Mobile extends BaseContext implements Spec.Mobile {
  public channel = 'mobile' as 'mobile'
  public app: App
  public device: Device
  public network: Network
  public os: OS
  constructor(properties: any) {
    super(properties)
    this.app = new App(properties.app)
    this.device = new Device(properties.device)
    this.network = new Network(properties.network)
    this.os = new OS(properties.os)
  }
}

export class App extends Facade<Spec.App> implements Spec.App {
  constructor(event: any) {
    super(event)
  }
  get build() {
    return this.toJSON().build
  }

  get name() {
    return this.toJSON().name
  }

  get version() {
    return this.toJSON().version
  }
}

export class Device extends Facade<Spec.Device> implements Spec.Device {
  constructor(event: any) {
    super(event)
  }

  get id() {
    return this.toJSON().id
  }

  get manufacturer() {
    return this.toJSON().manufacturer
  }

  get model() {
    return this.toJSON().model
  }

  get name(){
    return this.toJSON().name
  }

  get type() {
    return this.toJSON().type
  }

  get version() {
    return this.toJSON().version
  }
}

export class Network extends Facade<Spec.Network> implements Spec.Network {
  constructor(event: any) {
    super(event)
  }

  get bluetooth() {
    return this.toJSON().bluetooth
  }

  get carrier() {
    return this.enforce.string(this.toJSON().carrier)
  }

  get cellular() {
    return this.enforce.string(this.toJSON().cellular)
  }

  get wifi() {
    return this.toJSON().wifi
  }
}

export class OS extends Facade<Spec.OS> implements Spec.OS {
  constructor(event: any) {
    super(event)
  }

  get name() {
    return this.enforce.string(this.toJSON().name)
  }

  get version() {
    return this.enforce.string(this.toJSON().version)
  }
}
