import { Integration, ValidationError, Server } from '../../src'
import { Track, OrderCompleted } from '../../lib/facade/events'
import { Success } from '../../src'
import axios from 'axios'

interface Settings {
  siteId: string
  apiKey: string
}

type CustomerEvent = {
  name: string
  type?: string
  data?: object
}

class Client {
  constructor(public settings: Settings) {}
  public async customerEvent(userId: string, payload: CustomerEvent) {
    return await axios.post(`https://track.customer.io/api/v1/customers/${userId}/events`, payload, {
      auth: {
        username: this.settings.siteId,
        password: this.settings.apiKey
      }
    })
  }
}

class CustomerIO extends Integration {
  public client: Client
  constructor(public settings: Settings) {
    super()
    this.client = new Client(settings)
    this.subscribe<OrderCompleted>('Order Completed', this.orderCompleted)
  }

  async track(event: Track) {
    if (!event.userId) {
      throw new ValidationError('UserId is Required')
    }
    await this.client.customerEvent(event.userId, {
      data: event.properties.toJSON(),
      name: event.event,
      type: event.event
    })
    return new Success()
  }

  async foo(event: object) {}

  async orderCompleted(event: OrderCompleted) {
    console.log(event.event)
    return new Success()
  }
}

const cio = new CustomerIO({
  apiKey: 'cf852dad8a7329164bb3',
  siteId: '30ff7b574d16a5ba64f9'
})

cio.track(new Track({
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
})).then(console.log).catch(console.error)
