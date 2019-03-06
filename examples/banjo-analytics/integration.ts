import { Integration } from '../../src/integration';
import { Track, OrderCompleted } from '../../src/facade/events';
import { Success, ValidationError } from '../../src/responses'

export class BanjoAnalytics extends Integration {
  constructor(public authToken: string) {
    super()
    this.subscribe<OrderCompleted>('Order Completed', this.orderCompleted)
  }

  async track(event: Track) {
    if (!event.userId) {
      throw new Error()
      // throw new ValidationError('UserId is a required property of all track events')
    }
    console.log(event.event)
    return new Success()
  }

  async orderCompleted(event: OrderCompleted) {
    console.log(event.properties.revenue)
    return new Success()
  }
}
