import { Integration } from '../../src/integration/index'
import { Success } from '../../src/integration/responses'
import { Track, Identify, OrderCompleted } from '../../lib/facade/events/'
import { Mapper } from './mapper'

interface Settings {}

export class Amplitude extends Integration {
  private mapper = new Mapper()
  constructor(public settings: Settings) {
    super()
    this.subscribe<OrderCompleted>('Order Completed', this.orderCompleted)
  }

  async orderCompleted(event: OrderCompleted) {
    const payload = this.mapper.orderCompleted(event)
    return new Success()
  }

  async track(event: Track) {
    const payload = this.mapper.track(event)
    console.log(payload)
    return new Success()
  }

  async identify(event: Identify) {
    return new Success()
  }
}
