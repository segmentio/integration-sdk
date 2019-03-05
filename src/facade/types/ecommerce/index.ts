import { Facade } from '../../src'
import * as Spec from '@segment/spec/types/ecommerce'

export class Product extends Facade<Spec.Product> implements Spec.Product {
  get brand() {
    return this.enforce.string(this.getProperties().brand)
  }

  get category() {
    return this.enforce.string(this.getProperties().category)
  }

  get coupon() {
    return this.enforce.string(this.getProperties().coupon)
  }

  get imageUrl() {
    return this.enforce.string(this.getProperties().imageUrl || this.getProperties().image_url as Spec.Product["imageUrl"])
  }

  get name() {
    return this.enforce.string(this.getProperties().name)
  }

  get position() {
    return this.enforce.number(this.getProperties().position)
  }

  get price() {
    return this.enforce.stringOrNumber(this.getProperties().price)
  }

  get productId() {
    return this.enforce.stringOrNumber(this.getProperties().productId || this.getProperties().product_id as Spec.Product["productId"])
  }

  get quantity() {
    return this.enforce.number(this.enforce.number(this.getProperties().quantity))
  }

  get sku() {
    return this.enforce.string(this.enforce.string(this.getProperties().sku))
  }

  get url() {
    return this.enforce.string(this.enforce.string(this.getProperties().url))
  }

  get variant() {
    return this.enforce.string(this.getProperties().variant)
  }
}

export class Order extends Facade<Spec.Order> implements Spec.Order {
  public products: Product[]

  constructor(event: Spec.Order) {
    super(event)
    const products = this.getProperties().products
    if (Array.isArray(products)) {
      this.products = products.map(product => new Product(product))
    } else {
      this.products = []
    }
  }

  get affiliation() {
    return this.enforce.string(this.getProperties().affiliation)
  }

  get checkoutId() {
    return this.enforce.stringOrNumber(this.getProperties().checkoutId || this.getProperties().checkout_id as Spec.Order["checkoutId"])
  }

  get coupon() {
    return this.enforce.string(this.enforce.string(this.getProperties().coupon))
  }

  get currency() {
    return this.enforce.string(this.getProperties().currency)
  }

  get discount() {
    return this.enforce.stringOrNumber(this.getProperties().discount)
  }

  get orderId() {
    return this.enforce.stringOrNumber(this.getProperties().orderId || this.getProperties().order_id as Spec.Order["orderId"])
  }

  get revenue() {
    return this.enforce.number(this.getProperties().revenue)
  }

  get shipping() {
    return this.enforce.string(this.getProperties().shipping)
  }

  get tax() {
    return this.enforce.number(this.getProperties().tax)
  }

  get total() {
    return this.enforce.number(this.getProperties().total)
  }
}

class Filter extends Facade<Spec.Filter> implements Spec.Filter {
  get type() {
    return this.getProperties().type
  }

  get value() {
    return this.getProperties().value
  }
}

class Sort extends Facade<Spec.Sorts> implements Spec.Sorts {
  get type() {
    return this.getProperties().type
  }

  get value() {
    return this.getProperties().value
  }
}

export class ProductList extends Facade<Spec.ProductList> implements Spec.ProductList {
  public products: Product[]
  public filters: Filter[]
  public sorts: Sort[]
  constructor(event: Spec.ProductList) {
    super(event)

    const products = this.getProperties().products
    if (Array.isArray(products)) {
      this.products = products.map(product => new Product(product))
    } else {
      this.products = []
    }

    const filters = this.getProperties().filters
    if (Array.isArray(filters)) {
      this.filters = filters.map(filter => new Filter(filter))
    } else {
      this.filters = []
    }

    const sorts = this.getProperties().sorts
    if (Array.isArray(sorts)) {
      this.sorts = sorts.map(sort => new Sort(sort))
    } else {
      this.sorts = []
    }
  }

  get category() {
    return this.getProperties().category
  }

  get listId() {
    return this.getProperties().listId || this.getProperties().list_id as Spec.ProductList["listId"]
  }
}

export class Promotion extends Facade<Spec.Promotion> implements Spec.Promotion {
  get creative() {
    return this.getProperties().creative
  }

  get name() {
    return this.getProperties().name
  }

  get position() {
    return this.getProperties().position
  }

  get promotionId() {
    return this.getProperties().promotionId
  }
}

export class CheckoutStep extends Facade<Spec.CheckoutStep> implements Spec.CheckoutStep {
  get checkoutId() {
    return this.getProperties().checkoutId
  }

  get orderId() {
    return this.getProperties().orderId
  }

  get step() {
    return this.getProperties().step
  }

  get shippingMethod() {
    return this.getProperties().shippingMethod
  }

  get paymentMethod() {
    return this.getProperties().paymentMethod
  }
}

export class Cart extends Facade<Spec.Cart> implements Spec.Cart {
  public products: Product[]
  constructor(properties: Spec.Cart) {
    super(properties)
    const products = properties.products
    if (Array.isArray(products)) {
      this.products = products.map(product => new Product(product))
    } else {
      this.products = []
    }
  }
  get cartId() {
    return this.getProperties().cartId || this.getProperties().cart_id as Spec.Cart["cartId"]
  }
}
