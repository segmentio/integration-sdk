import { Facade } from '../../src'
import * as Spec from '../../../spec'

function assertString(value: any, coerce?: boolean): string | undefined {
  const type = typeof value
  if (type === 'string') {
    return value
  }

  if (coerce) {
    if (type === 'number' || type === 'boolean') {
      return value.toString()
    }
  }
}

function enumerable(value: boolean) {
  console.log(value)
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(propertyKey)
    console.log(descriptor)
  }
}

class Product extends Facade<Spec.Product> implements Spec.Product {
  get brand() {
    return assertString(this.toJSON().brand)
  }
  get category() {
    return this.toJSON().category
  }

  get coupon() {
    return this.toJSON().coupon
  }

  get imageUrl() {
    return this.toJSON().imageUrl || this.toJSON().image_url
  }

  get name() {
    return this.toJSON().name
  }

  get position() {
    return this.toJSON().position
  }

  get price() {
    return this.toJSON().price
  }

  get productId() {
    return this.toJSON().productId || this.toJSON().product_id
  }

  get quantity() {
    return this.toJSON().quantity
  }

  get sku() {
    return this.toJSON().sku
  }

  get url() {
    return this.toJSON().url
  }

  get variant() {
    return this.toJSON().variant
  }
}

export class OrderCompleted extends Facade<Spec.OrderCompleted> implements Spec.OrderCompleted {
  public products: Product[]

  constructor(event: Spec.OrderCompleted) {
    super(event)
    const products = this.toJSON().products
    if (Array.isArray(products)) {
      this.products = products.map(product => new Product(product))
    }
    this.products = []
  }

  get affiliation() {
    return this.toJSON().affiliation
  }

  @enumerable(false)
  get checkoutId() {
    console.log('test')
    return this.toJSON().checkoutId || this.toJSON().checkout_id as Spec.OrderCompleted["checkoutId"]
  }

  get coupon() {
    return this.toJSON().coupon
  }

  get currency() {
    return this.toJSON().currency
  }

  get discount() {
    return this.toJSON().discount
  }

  get orderId() {
    return this.toJSON().orderId || this.toJSON().order_id as Spec.OrderCompleted["orderId"]
  }

  get revenue() {
    return this.toJSON().revenue
  }

  get shipping() {
    return this.toJSON().shipping
  }

  get tax() {
    return this.toJSON().tax
  }

  get total() {
    return this.toJSON().total
  }
}

export class ProductListViewed extends Facade<Spec.ProductListViewed> implements Spec.ProductListViewed {
  public products: Product[]
  constructor(event: Spec.ProductListViewed) {
    super(event)
    const products = this.toJSON().products
    if (Array.isArray(products)) {
      this.products = products.map(product => new Product(product))
    }
    this.products = []
  }
  get category() {
    return this.toJSON().category
  }

  get listId() {
    return this.toJSON().listId || this.toJSON().list_id as Spec.ProductListViewed["listId"]
  }
}
