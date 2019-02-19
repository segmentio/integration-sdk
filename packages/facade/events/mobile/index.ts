import { Facade } from '../../src'
import * as Spec from '../../../spec/events/mobile'

export class ApplicationInstalled extends Facade<Spec.ApplicationInstalled> implements Spec.ApplicationInstalled {
  get build() {
    return this.enforce.stringOrNumber(this.toJSON().build)
  }

  get version() {
    return this.enforce.string(this.toJSON().version)
  }
}

export class ApplicationOpened extends Facade<Spec.ApplicationOpened> implements Spec.ApplicationOpened {
  get build() {
    return this.enforce.string(this.toJSON().build)
  }

  get fromBackground() {
    return this.toJSON().fromBackground || this.toJSON().from_background as Spec.ApplicationOpened["fromBackground"]
  }

  get referringApplication() {
    return this.enforce.string(this.toJSON().referringApplication || this.toJSON().referring_application as Spec.ApplicationOpened["referringApplication"])
  }

  get url() {
    return this.enforce.string(this.toJSON().url)
  }

  get version() {
    return this.enforce.string(this.toJSON().version)
  }
}

export class ApplicationBackgrounded extends Facade<Spec.ApplicationBackgrounded> implements Spec.ApplicationBackgrounded {}

export class ApplicationUpdated extends Facade<Spec.ApplicationUpdated> implements Spec.ApplicationUpdated {
  get build() {
    return this.enforce.stringOrNumber(this.toJSON().build)
  }

  get previousBuild() {
    return this.enforce.stringOrNumber(this.toJSON().previousBuild || this.toJSON().previous_build)
  }

  get previousVersion() {
    return this.enforce.string(this.toJSON().previousVersion || this.toJSON().previous_version)
  }

  get version() {
    return this.enforce.string(this.toJSON().version)
  }
}

export class ApplicationUninstalled extends Facade<Spec.ApplicationUninstalled> implements Spec.ApplicationUninstalled {}

export class ApplicationCrashed extends Facade<Spec.ApplicationCrashed> implements Spec.ApplicationCrashed {}

class Campaign extends Facade<Spec.Campaign> implements Spec.Campaign {
  get source () {
    return this.enforce.string(this.toJSON().source)
  }

  get name () {
    return this.enforce.string(this.toJSON().name)
  }

  get content () {
    return this.enforce.string(this.toJSON().content)
  }

  get adCreative () {
    return this.enforce.string(this.toJSON().adCreative)
  }

  get adGroup () {
    return this.enforce.string(this.toJSON().adGroup)
  }
}

export class InstallAttributed extends Facade<Spec.InstallAttributed> implements Spec.InstallAttributed {
  public campaign: Campaign
  constructor(event: Spec.InstallAttributed) {
    super(event)
    this.campaign = new Campaign(event.campaign)
  }

  get provider () {
    return this.enforce.string(this.toJSON().provider)
  }
}

export class PushNotificationReceived extends Facade<Spec.PushNotificationReceived> implements Spec.PushNotificationReceived {
  public campaign: Campaign
  constructor(event: Spec.PushNotificationReceived) {
    super(event)
    this.campaign = new Campaign(event.campaign)
  }
}

export class PushNotificationTapped extends Facade<Spec.PushNotificationTapped> implements Spec.PushNotificationTapped {
  public campaign: Campaign
  constructor(event: Spec.PushNotificationTapped) {
    super(event)
    this.campaign = new Campaign(event.campaign)
  }

  get action () {
    return this.enforce.string(this.toJSON().action)
  }
}

export class PushNotificationBounced extends PushNotificationTapped implements Spec.PushNotificationBounced {}

export class DeepLinkClicked extends Facade<Spec.DeepLinkClicked> implements Spec.DeepLinkClicked {
  get provider () {
    return this.enforce.string(this.toJSON().provider)
  }

  get url() {
    return this.enforce.string(this.toJSON().url)
  }
}

export class DeepLinkOpened extends DeepLinkClicked implements Spec.DeepLinkOpened {}
