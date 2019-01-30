import { Integration } from '../integration/index'
import {
  OrderCompleted,
  ProductClicked,
  ProductAdded,
  ProductListFiltered
} from '../facade/spec/ecommerce'
import { Track, Identify } from '../facade/methods'
import { Server } from '../server'

class Mapper {
  track(event: Track) {
    const payload = {
      event_type: event.name,
      time: event.timestamp,
      event_properties: event.properties.toJSON(),
      user_id: event.context.ip
    }

    // Map mobile specific properties.
    if (event.context.channel === 'mobile') {
      payload['device_id'] = event.context.device.id
      payload['device_model'] = event.context.device.model
      payload['device_brand'] = event.context.device.type
      payload['app_version'] = event.context.app.version
    }

    return payload
  }
}

class Amplitude extends Integration {
  private mapper = new Mapper()
  constructor() {
    super()
    this.subscribe<OrderCompleted>('Order Completed', this.orderCompleted)
    this.subscribe<ProductAdded>('Product Added', this.productClicked)
  }

  async orderCompleted(event: Track<OrderCompleted>) {
    return { status: 200, res: {} }
  }

  async productClicked(event: Track<ProductClicked>) {
    if (event.context.channel === 'mobile') {
      event.context.device
    }
    return { status: 200, res: {} }
  }

  async track(event: Track) {
    const payload = this.mapper.track(event)
    if (!payload.user_id && !payload['device_id']) {
    }
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
