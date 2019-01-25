import { Facade } from '../../src'
import * as Spec from '../../../spec'

function assertString<T>(value: T): T | undefined {
  const type = typeof value
  if (type === 'string') {
    return value
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

  get checkoutId() {
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

class Filter extends Facade<Spec.Filter> implements Spec.Filter {
  get type() {
    return this.toJSON().type
  }

  get value() {
    return this.toJSON().value
  }
}

class Sort extends Facade<Spec.Sorts> implements Spec.Sorts {
  get type() {
    return this.toJSON().type
  }

  get value() {
    return this.toJSON().value
  }
}

export class ProductListFiltered extends ProductListViewed implements Spec.ProductListFiltered {
  public filters: Filter[] = []
  public sorts: Sort[] = []
  constructor(event: Spec.ProductListFiltered) {
    super(event)
    const filters = event.filters
    const sorts = event.sorts
    if (Array.isArray(filters)) {
      this.filters = filters.map(filter => new Filter(filter))
    }

    if (Array.isArray(sorts)) {
      this.sorts = sorts.map(sort => new Sort(sort))
    }
  }
}

export class PromotionViewed extends Facade<Spec.PromotionViewed> implements Spec.PromotionViewed {
  get creative() {
    return this.toJSON().creative
  }

  get name() {
    return this.toJSON().name
  }

  get position() {
    return this.toJSON().position
  }

  get promotionId() {
    return this.toJSON().promotionId
  }
}

export class PromotionClicked extends PromotionViewed {}

export class ProductClicked extends Product {}

export class ProductAdded extends Product {}

export class ProductRemoved extends Product {}
