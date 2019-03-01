import * as Ecommerce from '../../lib/facade/events/ecommerce'
import * as Mobile from '../../lib/facade/events/mobile'
import { Track } from '../../lib/facade/events';

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
  'Promotion Clicked': Ecommerce.PromotionClicked,
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

export function toFacade(name: string, properties: object) {
  const SpecFacade = specEvents[name]
  if (SpecFacade) {
    return new SpecFacade(properties) as Track
  }
}
