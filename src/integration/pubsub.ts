import * as Spec from '@segment/spec-ts'
import { ValueOf, EventName } from './types'
import { EventNotSupported } from '../errors';

interface EventHandler<Event extends ValueOf<EventMap>, Response> {
  (event: Event): Promise<Response>
}

export interface EventMap {
  // Base events
  'group': Spec.Group
  'page': Spec.Page
  'identify': Spec.Identify
  'track': Spec.Track

  // eCommerce
  'Order Completed': Spec.OrderCompleted
  'Order Updated': Spec.OrderUpdated
  'Order Refunded': Spec.OrderRefunded
  'Order Cancelled': Spec.OrderCancelled
  'Product List Viewed': Spec.ProductListViewed
  'Product Clicked': Spec.ProductClicked
  'Product Added': Spec.ProductAdded
  'Product List Filtered': Spec.ProductListFiltered
  'Product Removed': Spec.ProductRemoved
  'Product Viewed': Spec.ProductViewed
  'Promotion Clicked': Spec.PromotionClicked
  'Promotion Viewed': Spec.PromotionViewed
  'Cart Viewed': Spec.CartViewed
  'Checkout Started': Spec.CheckoutStarted
  'Checkout Step Completed': Spec.CheckoutStepCompleted
  'Payment Info Entered': Spec.PaymentInfoEntered

  // Mobile
  'Application Installed': Spec.ApplicationInstalled
  'Application Opened': Spec.ApplicationOpened
  'Application Backgrounded': Spec.ApplicationBackgrounded
  'Application Updated': Spec.ApplicationUpdated
  'Application Uninstalled': Spec.ApplicationUninstalled
  'Application Crashed': Spec.ApplicationCrashed
  'Install Attributed': Spec.InstallAttributed
  'Push Notification Received': Spec.PushNotificationReceived
  'Push Notification Bounced': Spec.PushNotificationBounced
  'Deep Link Clicked': Spec.DeepLinkClicked
  'Deep Link Opened': Spec.DeepLinkOpened
}

export default class PubSub<Response = any> {
  public subscriptions = new Map<string, EventHandler<ValueOf<any>, Response>>()

  constructor() {}

  public subscribe<T extends ValueOf<EventMap>>(name: EventName<EventMap, T>, handler: EventHandler<T, Response>) {
    this.subscriptions.set(name, handler.bind(this))
  }

  public async publish(event: { type: 'identify' | 'group' | 'page'} | { type: 'track', event: string }) {
    if (event.type === 'track' && this.subscriptions.has(event.event)) {
      const handler = this.subscriptions.get(event.event)
      if (handler) {
        return await handler(event)
      }
    }

    const handler = this.subscriptions.get(event.type)
    if (handler) {
      return await handler(event)
    }

    throw new EventNotSupported(event.type)
  }
}
