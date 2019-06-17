import * as Facade from '@segment/facade'
import { ValueOf } from './types'

export interface FacadeConstructor {
  new(...args: any[]): any
}

export type SpecEvent = ValueOf<SpecEventMap>

export class SpecEventMap {
  // eCommerce
  'Order Completed' = Facade.OrderCompleted
  'Order Updated' = Facade.OrderUpdated
  'Order Refunded' = Facade.OrderRefunded
  'Order Cancelled' = Facade.OrderCancelled
  'Product List Viewed' = Facade.ProductListViewed
  'Product Clicked' = Facade.ProductClicked
  'Product Added' = Facade.ProductAdded
  'Product List Filtered' = Facade.ProductListFiltered
  'Product Removed' = Facade.ProductRemoved
  'Product Viewed' = Facade.ProductViewed
  'Promotion Clicked' = Facade.PromotionClicked
  'Promotion Viewed' = Facade.PromotionViewed
  'Cart Viewed' = Facade.CartViewed
  'Checkout Started' = Facade.CheckoutStarted
  'Checkout Step Completed' = Facade.CheckoutStepCompleted
  'Payment Info Entered' = Facade.PaymentInfoEntered

  // Mobile
  'Application Installed' = Facade.ApplicationInstalled
  'Application Opened' = Facade.ApplicationOpened
  'Application Backgrounded' = Facade.ApplicationBackgrounded
  'Application Updated' = Facade.ApplicationUpdated
  'Application Uninstalled' = Facade.ApplicationUninstalled
  'Application Crashed' = Facade.ApplicationCrashed
  'Install Attributed' = Facade.InstallAttributed
  'Push Notification Received' = Facade.PushNotificationReceived
  'Push Notification Bounced' = Facade.PushNotificationBounced
  'Deep Link Clicked' = Facade.DeepLinkClicked
  'Deep Link Opened' = Facade.DeepLinkOpened
}
