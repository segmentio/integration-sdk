import { Facade } from '../../src'
import * as Spec from '@segment/spec/types/mobile'

export class App extends Facade<Spec.Application> implements Spec.Application {
  constructor(properties: any) {
    super(properties)
  }
  get build() {
    return this.enforce.string(this.getProperties().build)
  }

  get name() {
    return this.enforce.string(this.getProperties().name)
  }

  get version() {
    return this.enforce.string(this.getProperties().version)
  }
}

export class Device extends Facade<Spec.Device> implements Spec.Device {
  constructor(properties: any) {
    super(properties)
  }

  get id() {
    return this.enforce.string(this.getProperties().id)
  }

  get manufacturer() {
    return this.enforce.string(this.getProperties().manufacturer)
  }

  get model() {
    return this.enforce.string(this.getProperties().model)
  }

  get name(){
    return this.enforce.string(this.getProperties().name)
  }

  get type() {
    return this.enforce.string(this.getProperties().type)
  }

  get version() {
    return this.enforce.string(this.getProperties().version)
  }
}

export class Network extends Facade<Spec.Network> implements Spec.Network {
  constructor(properties: any) {
    super(properties)
  }

  get bluetooth() {
    return this.enforce.boolean(this.getProperties().bluetooth)
  }

  get carrier() {
    return this.enforce.string(this.getProperties().carrier)
  }

  get cellular() {
    return this.enforce.string(this.getProperties().cellular)
  }

  get wifi() {
    return this.enforce.boolean(this.getProperties().wifi)
  }
}

export class OS extends Facade<Spec.OS> implements Spec.OS {
  constructor(properties: any) {
    super(properties)
  }

  get name() {
    return this.enforce.string(this.getProperties().name)
  }

  get version() {
    return this.enforce.string(this.getProperties().version)
  }
}

export class Campaign extends Facade<Spec.Campaign> implements Spec.Campaign {
  get source () {
    return this.enforce.string(this.getProperties().source)
  }

  get name () {
    return this.enforce.string(this.getProperties().name)
  }

  get content () {
    return this.enforce.string(this.getProperties().content)
  }

  get adCreative () {
    return this.enforce.string(this.getProperties().adCreative)
  }

  get adGroup () {
    return this.enforce.string(this.getProperties().adGroup)
  }
}

export class ApplicationUpdate extends Facade<Spec.ApplicationUpdate> implements Spec.ApplicationUpdate {
  get build() {
    return this.enforce.stringOrNumber(this.getProperties().build)
  }

  get previousBuild() {
    return this.enforce.stringOrNumber(this.getProperties().previousBuild || this.getProperties().previous_build)
  }

  get previousVersion() {
    return this.enforce.string(this.getProperties().previousVersion || this.getProperties().previous_version)
  }

  get version() {
    return this.enforce.string(this.getProperties().version)
  }
}

export class ApplicationOpen extends Facade<Spec.ApplicationOpen> implements Spec.ApplicationOpen {
  get build() {
    return this.enforce.string(this.getProperties().build)
  }

  get fromBackground() {
    return this.enforce.boolean(this.getProperties().fromBackground || this.getProperties().from_background as Spec.ApplicationOpen["fromBackground"])
  }

  get referringApplication() {
    return this.enforce.string(this.getProperties().referringApplication || this.getProperties().referring_application as Spec.ApplicationOpen["referringApplication"])
  }

  get url() {
    return this.enforce.string(this.getProperties().url)
  }

  get version() {
    return this.enforce.string(this.getProperties().version)
  }
}

export class InstallAttribution extends Facade<Spec.InstallAttribution> implements Spec.InstallAttribution {
  public campaign: Campaign
  constructor(properties: Spec.InstallAttribution) {
    super(properties)
    this.campaign = new Campaign(this.getProperties().campaign)
  }

  get provider () {
    return this.enforce.string(this.getProperties().provider)
  }
}

export class PushNotification extends Facade<Spec.PushNotification> implements Spec.PushNotification {
  public campaign: Campaign
  constructor(properties: Spec.PushNotification) {
    super(properties)
    this.campaign = new Campaign(this.getProperties().campaign)
  }

  get action () {
    return this.enforce.string(this.getProperties().action)
  }
}

export class DeepLink extends Facade<Spec.DeepLink> implements Spec.DeepLink {
  get provider () {
    return this.enforce.string(this.getProperties().provider)
  }

  get url() {
    return this.enforce.string(this.getProperties().url)
  }
}

export class Install extends Facade<Spec.Install> implements Spec.Install {
  get build() {
    return this.enforce.stringOrNumber(this.getProperties().build)
  }

  get version() {
    return this.enforce.string(this.getProperties().version)
  }
}
