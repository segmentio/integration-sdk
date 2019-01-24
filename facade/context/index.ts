import { Facade } from '../src'
import * as Spec from '../spec/context'

export class Context extends Facade<Spec.Context> implements Spec.Context {
  public channel: 'mobile' | 'web' | 'server'
  constructor(event: any) {
    super(event)
    this.channel = event.channel
  }
}

export class Mobile extends Context implements Spec.Mobile {
  public channel = 'mobile' as 'mobile'
  public app: App
  public device: Device
  constructor(event: any) {
    super(event)
    this.app = new App(event.app)
    this.device = new Device(event.device)
  }
}

export class Web extends Context implements Spec.Web {
  channel = 'web' as 'web'
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
