import { Integration } from '../../src/integration/index'
import { Success, ValidationError } from '../../src/integration/responses'
import { Track, OrderCompleted, Message, ProductRemoved } from '../../lib/facade'
import { Mapper } from './mapper'
import { Client } from './client';
import { Track as TrackFixture } from 'chaos-fixtures'

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

  async orderCompleted(event: Track<OrderCompleted>, options: Options = {}) {
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

  async productRemoved(event: Track<ProductRemoved>, options: Options) {
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

const fixture = new TrackFixture(event => {
  return event
})

const googleAnalytics = new GoogleAnalytics({
  enableEnhancedEcommerce: true,
  trackingId: 'UA-80975481-1'
})

googleAnalytics.handle(fixture.payload as Track).then(console.log).catch(console.error)
