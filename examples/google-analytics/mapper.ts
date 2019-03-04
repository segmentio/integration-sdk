import {
  ClientId,
  UserId,
  EventHit,
  ProductAction,
  AllHits,
  TransactionHit,
  PageviewHit,
  ContentInformation,
  EnhancedEcommerceParameters,
  EnhancedTransactionHit,
  ItemHit
} from './types'
import { Track, Identify, OrderCompleted, Page } from '../../lib/facade/events'
import { ValidationError } from '../../src'
import { Product, ProductList } from '../../lib/facade/types/ecommerce'
import { Options } from '.'
import { URL } from 'url'

class ProductMapper {
  private map = {}
  public mapProducts(products: Product[] = [], action: ProductAction) {
    const prefix = 'pr'
    this.setProductAction(action)
    products.forEach((product, index) => {
      // Index values must start at 1
      index = index++
      this.setSku(prefix, index, product.sku)
      this.setName(prefix, index, product.name)
      this.setBrand(prefix, index, product.brand)
      this.setCategory(prefix, index, product.category)
      this.setVariant(prefix, index, product.variant)
      this.setQuantity(prefix, index, product.quantity)
      if (product.price) {
        this.setPrice(prefix, index, product.price.toString())
      }
    })
    return this.map
  }

  public mapProductImpression(
    productList: ProductList[] = [],
    action: ProductAction
  ) {
    this.setProductAction(action)
    productList.forEach((list, index) => {
      const listIndex = index++
      this.setImpressionListName('il', index, list.listId)
      list.products.forEach((product, index) => {
        const productIndex = index++
        const prefix = `il${listIndex}pi`
        this.setSku(prefix, productIndex, product.sku)
        this.setName(prefix, productIndex, product.name)
        this.setBrand(prefix, productIndex, product.brand)
        this.setCategory(prefix, productIndex, product.category)
        this.setVariant(prefix, productIndex, product.variant)
      })
    })
    return this.map
  }

  private set(
    prefix: string,
    parameter: string,
    index: number,
    value: string | number | void
  ) {
    if (value && index <= 200) {
      const key = prefix + index.toString() + parameter
      this.map[key] = value
    }
  }

  private setProductAction(action: ProductAction) {
    this.map['pa'] = action
  }

  private setSku(prefix: string, index: number, value?: string) {
    this.set(prefix, 'id', index, value)
  }

  private setName(prefix: string, index: number, value?: string) {
    this.set(prefix, 'nm', index, value)
  }

  private setBrand(prefix: string, index: number, value?: string) {
    this.set(prefix, 'br', index, value)
  }

  private setCategory(prefix: string, index: number, value?: string) {
    this.set(prefix, 'ca', index, value)
  }

  private setVariant(prefix: string, index: number, value?: string) {
    this.set(prefix, 'va', index, value)
  }

  private setPrice(prefix: string, index: number, value?: string) {
    this.set(prefix, 'pr', index, value)
  }

  private setQuantity(prefix: string, index: number, value?: number) {
    this.set(prefix, 'qt', index, value)
  }

  private setImpressionListName(prefix: string, index: number, value?: string) {
    this.set(prefix, 'nm', index, value)
  }
}

interface EnhancedEcommerceProperties {
  products?: Product[]
  productList?: ProductList[]
  action: ProductAction
}

export class Mapper {
  constructor(
    private enableEnhancedEcommerce: boolean,
    private trackingId: string
  ) {}
  /**
   * @param {EnhancedEcommerceProperties} enhancedEcommerceProperties - Optional properties to map to [Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#enhanced-ecomm) parameters. This mapping will only occur if the `enableEnhancedEcommerce` setting passed in to the `Mapper` constructor is `true`.
   */
  event(
    event: Track,
    options: Options,
    enhancedEcommerceProperties?: EnhancedEcommerceProperties
  ): EventHit {
    const payload: EventHit = {
      t: 'event',
      ea: event.event,
      ec: 'track',
      ...this.hit(event, options)
    }

    const value = event.properties.toJSON()['value']

    if (typeof value === 'number') {
      payload.ev = value
    }

    if (this.enableEnhancedEcommerce && enhancedEcommerceProperties) {
      return Object.assign(
        payload,
        this.enhancedEcommerceParameters(enhancedEcommerceProperties)
      )
    } else {
      return payload
    }
  }

  pageview(event: Page, options: Options): PageviewHit {
    if (!event.properties.url) {
      throw new ValidationError('URL is a required property.')
    }

    return {
      t: 'pageview',
      dl: event.properties.url,
      ...this.hit(event, options)
    }
  }

  /**
   * @description Builds a `transaction` hit payload. Returns either an enhanced ecommerce `transaction` hit or, if the user is not using enhanced ecommerce, a tuple where the first element is a `transaction` hit and the remaning n elements are `item` hits.
   */
  transaction(
    event: OrderCompleted,
    enableEnhancedEcommerce: boolean,
    options: Options
  ): [TransactionHit, ...ItemHit[]] | EnhancedTransactionHit {
    if (!event.properties.orderId) {
      throw new ValidationError('OrderId is required.')
    }

    const transaction: TransactionHit = {
      t: 'transaction',
      ti: event.properties.orderId,
      ...this.hit(event, options)
    }

    if (enableEnhancedEcommerce) {
      return Object.assign(
        transaction,
        this.enhancedEcommerceParameters({
          products: event.properties.products,
          action: 'purchase'
        })
      )
    }
    return [
      transaction,
      ...this.item(event, event.properties.products, options)
    ]
  }

  item(event: Track, products: Product[], options: Options): ItemHit[] {
    return products.map<ItemHit>(product => {
      if (!product.name) {
        throw new ValidationError('ProductName is a Required Property.')
      }
      const itemHit: ItemHit = {
        t: 'item',
        in: product.name,
        iq: product.quantity,
        ic: product.sku,
        iv: product.category,
        ...this.hit(event, options)
      }
      if (product.price) {
        itemHit.ip = product.price.toString()
      }
      return itemHit
    })
  }

  private mapContentInformation(
    event: Track | Identify | Page
  ): ContentInformation {
    const context = event.context
    const pageData = event instanceof Page ? event.properties : context.page
    const url = new URL(pageData.url || '')

    return {
      dh: url.host,
      dl: pageData.url,
      dr: pageData.referrer
    }
  }

  private getUserId(
    event: Track | Identify | Page,
    options: Options
  ): UserId | ClientId {
    if (options.clientId) {
      return { cid: options.clientId, uid: event.anonymousId }
    }

    if (event.userId) {
      return { cid: event.userId.toString(), uid: event.anonymousId }
    }

    if (event.anonymousId) {
      return { uid: event.anonymousId, cid: event.userId }
    }

    throw new ValidationError(
      'One of UserId, AnonymousId, or ClientId are required.'
    )
  }

  private enhancedEcommerceParameters(
    properties: EnhancedEcommerceProperties
  ): EnhancedEcommerceParameters {
    const { products, action, productList } = properties
    const mapper = new ProductMapper()

    return {
      ...mapper.mapProducts(products, action),
      ...mapper.mapProductImpression(productList, action)
    }
  }

  private hit(event: Track | Page | Identify, options: Options): AllHits {
    return {
      v: 1,
      tid: this.trackingId,
      ...this.getUserId(event, options),
      ...this.mapContentInformation(event)
    }
  }
}
