import { Track, Identify, OrderCompleted } from '../../packages/facade'
import { ValidationError } from '../../src/integration/responses'
import {
  MobilePayload,
  BasePayload,
  TrackPayload,
  DeviceId,
  UserId,
  RevenuePayload
} from './types'

export class Mapper {
  mapBasePayload(event: Track | Identify): BasePayload {
    return {
      time: event.timestamp,
      ...this.getId(event),
      ...this.mapMobileProperties(event)
    }
  }

  getId(event: Track | Identify): UserId | DeviceId {
    let deviceId
    const userId = event.userId
    if (event.context.channel === 'mobile' && event.context.device.id) {
      deviceId = event.context.device.id
    }

    if (userId && deviceId) {
      return { user_id: userId, device_id: deviceId }
    }

    if (userId) {
      return { user_id: userId.toString() }
    }

    if (deviceId) {
      return { device_id: deviceId }
    }

    throw new ValidationError('User Id or Device Id are required properties.')
  }

  mapMobileProperties(event: Track | Identify): MobilePayload {
    if (event.context.channel !== 'mobile') {
      return {}
    }
    return {
      app_version: event.context.app.version
    }
  }

  track(event: Track): TrackPayload {
    return {
      ...this.mapBasePayload(event),
      event_type: event.name,
      event_properties: event.properties.toJSON(),
    }
  }

  orderCompleted(event: Track<OrderCompleted>): RevenuePayload[] {
    if (!event.properties.products.length) {
      throw new ValidationError('You must specify at least one product in an OrderCompleted event')
    }
    return event.properties.products.map(product => {
      if (!product.price) {
        throw new ValidationError('Price is a required property for all products in an OrderCompleted event')
      }

      if (!product.quantity) {
        throw new ValidationError('Quantity is a required property for all products in an OrderCompleted event')
      }

      return {
        ...this.track(event),
        price: product.price,
        quantity: product.quantity
      }
    })
  }
}
