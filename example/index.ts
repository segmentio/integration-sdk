import { Integration } from '../integration/index'
import { OrderCompleted, ProductClicked, ProductAdded, ProductListFiltered } from '../facade/spec/ecommerce'
import { Track, Identify } from '../facade/methods'
import { Server } from '../server'

class Amplitude extends Integration {
  constructor() {
    super()
    this.subscribe<OrderCompleted>('Order Completed', this.orderCompleted)
    this.subscribe<ProductListFiltered>('Product List Filtered', this.productClicked)
  }

  async orderCompleted(event: Track<OrderCompleted>) {
    return { status: 200, res: {} }
  }

  async productClicked(event: Track<ProductClicked>) {
    return { status: 200, res: {} }
  }

  async identify(event: Identify) {
    console.log(event.traits.email)
    return { status: 200, res: {} }
  }
}

const server = new Server(Amplitude)

server.proxyEvent({
  type: 'track',
  name: 'Order Completed',
  context: {
    channel: 'web'
  },
  properties: {
    checkoutId: 'foo'
  }
})

// server.listen()
