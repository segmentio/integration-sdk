import {
  ClientId,
  UserId,
  EventHit,
  ProductAction,
  AllHits,
  TransactionHit,
  PageviewHit
} from './types'
import { Track, Identify, OrderCompleted, Page } from '../../lib/facade'
import { ValidationError } from '../../src';

class ProductMapper {
  private _map = {}

  constructor(public productAction: ProductAction){
    this._map['pa'] = productAction
  }

  get map() {
    return this._map
  }

  private set(key: string, index: number, value?: string | number) {
    if (value && index < 200)  {
      this._map[`pr${index}${key}`] = value
    }
  }

  setSku(index: number, value?: string) {
    this.set('id', index, value)
  }

  setName(index: number, value?: string) {
    this.set('nm', index, value)
  }
}

export class Mapper {
  mapProducts(products: OrderCompleted["products"], productAction: ProductAction): Object {
    const productMapper = new ProductMapper(productAction)
    products.forEach((product, index) => {
      productMapper.setName(index, product.name)
      productMapper.setSku(index, product.sku)
    })
    return productMapper.map
  }

  getUserId(event: Track | Identify | Page): UserId | ClientId {
    if (event.userId) {
      return { uid: event.userId.toString() }
    }

    if (event.anonymousId) {
      return { uid: event.anonymousId.toString() }
    }

    throw new ValidationError('UserId or AnonymousId is required.')
  }

  track(event: Track): EventHit {
    return {
      t: 'event',
      ea: event.name,
      ec: 'track',
      ...this.hit(event),
    }
  }

  page(event: Page): PageviewHit {
    if (!event.properties.url) {
      throw new ValidationError('URL is a required property.')
    }

    return {
      t: 'pageview',
      dl: event.properties.url,
      ...this.hit(event),
    }
  }

  orderCompleted(event: Track<OrderCompleted>): TransactionHit {
    if (!event.properties.orderId) {
      throw new ValidationError('OrderId is required.')
    }

    return {
      t: 'transaction',
      ...this.hit(event),
      ...this.mapProducts(event.properties.products, 'purchase'),
      ti: event.properties.orderId
    }
  }

  hit(event: Track | Page | Identify): AllHits {
    return {
      v: 1,
      ...this.getUserId(event),
    }
  }
}
