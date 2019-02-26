import { Facade } from '../../src'
import { BaseContext } from '../common'
import * as Spec from '../../../spec/context/mobile'

export class Mobile extends BaseContext<Spec.Mobile> implements Spec.Mobile {
  public app: App
  public device: Device
  public network: Network
  public os: OS
  constructor(properties: Spec.Mobile) {
    super(properties)
    this.app = new App(this.toJSON().app)
    this.device = new Device(this.toJSON().device)
    this.network = new Network(this.toJSON().network)
    this.os = new OS(this.toJSON().os)
  }
}

export class App extends Facade<Spec.App> implements Spec.App {
  constructor(properties: any) {
    super(properties)
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
  constructor(properties: any) {
    super(properties)
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
  constructor(properties: any) {
    super(properties)
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
  constructor(properties: any) {
    super(properties)
  }

  get name() {
    return this.enforce.string(this.toJSON().name)
  }

  get version() {
    return this.enforce.string(this.toJSON().version)
  }
}
