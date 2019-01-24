import { Integration } from '../integration/index'
import { OrderCompleted } from '../facade/spec/ecommerce'
import { Track, Identify } from '../facade/methods'
import { Server } from '../server'

class Amplitude extends Integration {
  constructor() {
    super()
    this.subscribe<OrderCompleted>('Order Completed', this.orderCompleted)
  }

  async orderCompleted(event: Track<OrderCompleted>) {
    console.log(event.properties.toJSON())
    return { status: 200, res: {} }
  }

  async identify(event: Identify) {
    console.log(event.traits.email)
    return { status: 200, res: {} }
  }
}

const server = new Server(Amplitude)

server.listen()
