import { Integration } from '../integration/index'
import {
  OrderCompleted,
  ProductClicked,
  ProductAdded,
  ProductListFiltered
} from '../facade/spec/ecommerce'
import { Track, Identify } from '../facade/methods'
import { Server } from '../server'
import { Success } from '../integration/responses'

interface UserId {
  user_id: string
}

interface DeviceId {
  device_id: string
}

interface MobilePayload {
  app_version?: string
}

type BasePayload = {
  time?: string
  event_properties?: object
  user_properties?: object
} & MobilePayload & (UserId | DeviceId)

type TrackPayload = {
  event_type: string
} & BasePayload

class Mapper {
  mapBasePayload(event: Track | Identify): BasePayload {
    return {
      ...this.getId(event),
      ...this.getMobileProperties(event)
    }
  }

  getId(event: Track | Identify): UserId | DeviceId {
    let deviceId
    let userId
    if (event.context.channel === 'mobile' && event.context.device.id) {
      deviceId = event.context.device.id
    }

    if (event.userId) {
      userId = event.userId
    }

    if (userId && deviceId) {
      return { user_id: userId, device_id: deviceId }
    }

    if (userId) {
      return { user_id: userId }
    }

    if (deviceId) {
      return { device_id: deviceId }
    }

    throw new Error()
  }

  getMobileProperties(event: Track | Identify): MobilePayload {
    if (event.context.channel !== 'mobile') {
      return {}
    }
    return {
      app_version: event.context.app.version
    }
  }

  track(event: Track): TrackPayload {
    const payload: TrackPayload = {
      event_type: event.name,
      time: event.timestamp,
      event_properties: event.properties.toJSON(),
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
    return new Success()
  }

  async productClicked(event: Track<ProductClicked>) {
    if (event.context.channel === 'mobile') {
      event.context.device
    }
    return new Success()
  }

  async track(event: Track) {
    const payload = this.mapper.track(event)
    return new Success()
  }

  async identify(event: Identify) {
    console.log(event.traits.email)
    return new Success()
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
