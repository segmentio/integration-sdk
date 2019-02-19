export interface ApplicationInstalled {
  /**
   * The version installed.
   */
  version?: string
  /**
   * The build number of the installed app.
   */
  build?: string | number
}

export interface ApplicationOpened {
  /**
   * If application transitioned from “Background” to “Inactive” state prior to foregrounding (as opposed to from “Not Running” state).
   */
  fromBackground?: boolean
  url?: string
  referringApplication?: string
  version?: string
  build?: string | number
}

export interface ApplicationBackgrounded {}

export interface ApplicationUpdated {
  previousVersion?: string
  previousBuild?: string | number
  version?: string
  build?: string | number
}

export interface ApplicationUninstalled {}

export interface ApplicationCrashed {}

export interface Campaign {
  source?: string
  name?: string
  content?: string
  adCreative?: string
  adGroup?: string
}

export interface InstallAttributed {
  provider?: string
  campaign: Campaign
}

export interface PushNotificationReceived {
  campaign: Campaign
}

export interface PushNotificationTapped {
  action?: string
  campaign: Campaign
}

export interface PushNotificationBounced extends PushNotificationTapped {}

export interface DeepLinkClicked {
  provider?: string
  url?: string
}

export interface DeepLinkOpened extends DeepLinkClicked {}
