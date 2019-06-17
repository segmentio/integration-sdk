import { Integration } from '../../src/integration';
import { Track, OrderCompleted } from '@segment/facade';
import { Success } from 'http-responses-ts'

interface Settings {}

export class BanjoAnalytics extends Integration {
  constructor(public settings: Settings) {
    super(settings)
    this.subscribe('Order Completed', this.orderCompleted)
  }
  async track(event: Track) {
    const id = event.userId
    if (!event.userId) {
      return this.reject('UserId is a required property of all track events')
    }
    console.log(event.event)
    return new Success()
  }

  async orderCompleted(event: OrderCompleted) {
    console.log(event.properties.revenue)
    return new Success()
  }
}
