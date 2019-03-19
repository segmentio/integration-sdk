import * as Ecommerce from '../facade/events/ecommerce'
import * as Mobile from '../facade/events/mobile'
import { Track as SpecTrack } from '@segment/spec/events'
import { Track } from '../facade/events';

export interface SpecEvents {
  // eCommerce
  'Order Completed': Ecommerce.OrderCompleted
  'Order Updated': Ecommerce.OrderUpdated
  'Order Refunded': Ecommerce.OrderRefunded
  'Order Cancelled': Ecommerce.OrderCancelled
  'Product List Viewed': Ecommerce.ProductListViewed
  'Product Clicked': Ecommerce.ProductClicked
  'Product Added': Ecommerce.ProductAdded
  'Product List Filtered': Ecommerce.ProductListFiltered
  'Product Removed': Ecommerce.ProductRemoved
  'Product Viewed': Ecommerce.ProductViewed
  'Promotion Clicked': Ecommerce.PromotionClicked
  'Promotion Viewed': Ecommerce.PromotionViewed
  'Cart Viewed': Ecommerce.CartViewed
  'Checkout Started': Ecommerce.CheckoutStarted
  'Checkout Step Completed': Ecommerce.CheckoutStepCompleted
  'Payment Info Entered': Ecommerce.PaymentInfoEntered

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
  'Order Updated': Ecommerce.OrderUpdated,
  'Order Refunded': Ecommerce.OrderRefunded,
  'Order Cancelled': Ecommerce.OrderCancelled,
  'Product List Viewed': Ecommerce.ProductListViewed,
  'Product Clicked': Ecommerce.ProductClicked,
  'Product Added': Ecommerce.ProductAdded,
  'Product List Filtered': Ecommerce.ProductListFiltered,
  'Product Removed': Ecommerce.ProductRemoved,
  'Product Viewed': Ecommerce.ProductViewed,
  'Promotion Clicked': Ecommerce.PromotionClicked,
  'Promotion Viewed': Ecommerce.PromotionViewed,
  'Cart Viewed': Ecommerce.CartViewed,
  'Checkout Started': Ecommerce.CheckoutStarted,
  'Checkout Step Completed': Ecommerce.CheckoutStepCompleted,
  'Payment Info Entered': Ecommerce.PaymentInfoEntered,

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

export function toFacade(event: SpecTrack) {
  const SpecFacade = specEvents[event.event]
  if (SpecFacade) {
    return new SpecFacade(event) as Track
  }
}
