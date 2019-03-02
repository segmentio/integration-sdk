import { Integration } from '../../src/integration/index'
import { Server } from '../../src/server'
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

const amplitude = new Amplitude({})

amplitude.handle({
  type: 'track',
  event: 'Order Completed',
  anonymousId: '21312',
  context: {},
  messageId: 'sdlfkjo2384lkjef',
  properties: {
    products: [{
      sku: 'qasdfljhsdfl',
      price: 10,
      quantity: 2
    }]
  },
  receivedAt: new Date().toISOString(),
  sentAt: new Date().toISOString(),
  timestamp: Date.now().toString(),
  userId: '12312312'
}).then(res => '').catch(console.error)


// const server = new Server(Amplitude)

// server.listen()
