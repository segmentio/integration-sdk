import { Integration } from '../index'
import { OrderCompleted } from '../facade/spec/ecommerce'
import { Track } from '../facade/methods'
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
}

const server = new Server(Amplitude)

server.listen()
