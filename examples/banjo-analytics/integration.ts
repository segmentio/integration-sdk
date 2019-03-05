import { Integration, ValidationError, Success } from '../../src';
import { Track, OrderCompleted } from '../../lib/facade/events';

export class BanjoAnalytics extends Integration {
  constructor(public authToken: string) {
    super()
    this.subscribe<OrderCompleted>('Order Completed', this.orderCompleted)
  }

  async track(event: Track) {
    if (!event.userId) {
      throw new ValidationError('UserId is a required property of all track events')
    }
    console.log(event.event)
    return new Success()
  }

  async orderCompleted(event: OrderCompleted) {
    console.log(event.properties.revenue)
    return new Success()
  }
}
