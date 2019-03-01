import { Track } from '../track'
import * as Spec from '@segment/spec/events/mobile'
import { Install, ApplicationOpen, ApplicationUpdate, InstallAttribution, PushNotification, DeepLink } from '../../types/mobile';

export class ApplicationInstalled extends Track<Install> implements Spec.ApplicationInstalled {
  public event: Spec.ApplicationInstalled["event"]
  constructor(event: Spec.ApplicationInstalled) {
    super(event)
    this.event = event.event
    this.properties = new Install(event.properties)
  }
}

export class ApplicationOpened extends Track<ApplicationOpen> implements Spec.ApplicationOpened {
  public event: Spec.ApplicationOpened["event"]
  constructor(event: Spec.ApplicationOpened) {
    super(event)
    this.event = event.event
    this.properties = new ApplicationOpen(event.properties)
  }
}

export class ApplicationBackgrounded extends Track implements Spec.ApplicationBackgrounded {
  public event: Spec.ApplicationBackgrounded["event"]
  constructor(event: Spec.ApplicationBackgrounded) {
    super(event)
    this.event = event.event
  }
}

export class ApplicationUpdated extends Track<ApplicationUpdate> implements Spec.ApplicationUpdated {
  public event: Spec.ApplicationUpdated["event"]
  constructor(event: Spec.ApplicationUpdated) {
    super(event)
    this.event = event.event
    this.properties = new ApplicationUpdate(event.properties)
  }
}

export class ApplicationUninstalled extends Track implements Spec.ApplicationUninstalled {
  public event: Spec.ApplicationUninstalled["event"]
  constructor(event: Spec.ApplicationUninstalled) {
    super(event)
    this.event = event.event
  }
}

export class ApplicationCrashed extends Track implements Spec.ApplicationCrashed {
  public event: Spec.ApplicationCrashed["event"]
  constructor(event: Spec.ApplicationCrashed) {
    super(event)
    this.event = event.event
  }
}

export class InstallAttributed extends Track<InstallAttribution> implements Spec.InstallAttributed {
  public event: Spec.InstallAttributed["event"]
  constructor(event: Spec.InstallAttributed) {
    super(event)
    this.event = event.event
    this.properties = new InstallAttribution(event.properties)
  }
}

export class PushNotificationReceived extends Track<PushNotification> implements Spec.PushNotificationReceived {
  public event: Spec.PushNotificationReceived["event"]
  constructor(event: Spec.PushNotificationReceived) {
    super(event)
    this.event = event.event
    this.properties = new PushNotification(event.properties)
  }
}

export class PushNotificationTapped extends Track<PushNotification> implements Spec.PushNotificationTapped {
  public event: Spec.PushNotificationTapped["event"]
  constructor(event: Spec.PushNotificationTapped) {
    super(event)
    this.event = event.event
    this.properties = new PushNotification(event.properties)
  }
}

export class PushNotificationBounced extends Track<PushNotification> implements Spec.PushNotificationBounced {
  public event: Spec.PushNotificationBounced["event"]
  constructor(event: Spec.PushNotificationBounced) {
    super(event)
    this.event = event.event
    this.properties = new PushNotification(event.properties)
  }
}

export class DeepLinkClicked extends Track<DeepLink> implements Spec.DeepLinkClicked {
  public event: Spec.DeepLinkClicked["event"]
  constructor(event: Spec.DeepLinkClicked) {
    super(event)
    this.event = event.event
    this.properties = new DeepLink(event.properties)
  }
}

export class DeepLinkOpened extends Track<DeepLink> implements Spec.DeepLinkOpened {
  public event: Spec.DeepLinkOpened["event"]
  constructor(event: Spec.DeepLinkOpened) {
    super(event)
    this.event = event.event
    this.properties = new DeepLink(event.properties)
  }
}
