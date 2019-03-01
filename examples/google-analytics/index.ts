import { Integration } from '../../src/integration/index'
import { Success, ValidationError } from '../../src/integration/responses'
import { Track, OrderCompleted, Message, ProductRemoved } from '../../lib/facade/events'
import { Mapper } from './mapper'
import { Client } from './client';

export interface Settings {
  enableEnhancedEcommerce: boolean
  trackingId: string
}

export interface Options {
  clientId?: string
}

export class GoogleAnalytics extends Integration {
  private mapper: Mapper
  public client = new Client()

  constructor(public settings: Settings) {
    super()
    this.mapper = new Mapper(this.settings.enableEnhancedEcommerce, this.settings.trackingId)
    this.subscribe<OrderCompleted>('Order Completed', this.orderCompleted)
  }

  async track(event: Track, options: Options) {
    const payload = this.mapper.event(event, options)
    await this.client.event(payload, this.getUserAgent(event))
    return new Success()
  }

  async orderCompleted(event: OrderCompleted, options: Options = {}) {
    const payload = this.mapper.transaction(event, this.settings.enableEnhancedEcommerce, options)
    const userAgent = this.getUserAgent(event)

    if (Array.isArray(payload)) {
      await Promise.all(payload.map(p => {
        return this.client.event(p, userAgent)
      }))
    } else {
      await this.client.event(payload, this.getUserAgent(event))
    }

    return new Success()
  }

  async productRemoved(event: ProductRemoved, options: Options) {
    const payload = this.mapper.event(event, options, {
      products: [event.properties],
      action: 'remove'
    })
  }

  private getUserAgent<T extends Message>(event: T): string {
    const userAgent = event.context.userAgent
    if (!userAgent) {
      throw new ValidationError('User Agent is Required for All Events.')
    }
    return userAgent
  }
}