import { Integration } from '../../src/integration';
import { Track, OrderCompleted } from '../../src/facade/events';
import { Success, ValidationError } from '../../src/responses'

interface Settings {}

export class BanjoAnalytics extends Integration {
  constructor(public settings: Settings) {
    super()
    this.subscribe<OrderCompleted>('Order Completed', this.orderCompleted)
  }
  async track(event: Track) {
    if (!event.userId) {
      return new ValidationError('UserId is a required property of all track events')
    }
    console.log(event.event)
    return new Success()
  }

  async orderCompleted(event: OrderCompleted) {
    console.log(event.properties.revenue)
    return new Success()
  }
}
