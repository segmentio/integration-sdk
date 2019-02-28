import { Facade } from '../../src'
import * as Spec from '../../../spec/events/ecommerce'

export class Product extends Facade<Spec.Product> implements Spec.Product {
  get brand() {
    return this.enforce.string(this.toJSON().brand)
  }

  get category() {
    return this.enforce.string(this.toJSON().category)
  }

  get coupon() {
    return this.enforce.string(this.toJSON().coupon)
  }

  get imageUrl() {
    return this.enforce.string(this.toJSON().imageUrl || this.toJSON().image_url as Spec.Product["imageUrl"])
  }

  get name() {
    return this.enforce.string(this.toJSON().name)
  }

  get position() {
    return this.enforce.number(this.toJSON().position)
  }

  get price() {
    return this.enforce.number(this.toJSON().price)
  }

  get productId() {
    return this.enforce.stringOrNumber(this.toJSON().productId || this.toJSON().product_id as Spec.Product["productId"])
  }

  get quantity() {
    return this.enforce.number(this.enforce.number(this.toJSON().quantity))
  }

  get sku() {
    return this.enforce.string(this.enforce.string(this.toJSON().sku))
  }

  get url() {
    return this.enforce.string(this.enforce.string(this.toJSON().url))
  }

  get variant() {
    return this.enforce.string(this.toJSON().variant)
  }
}

export class OrderCompleted extends Facade<Spec.OrderCompleted> implements Spec.OrderCompleted {
  public products: Product[]

  constructor(event: Spec.OrderCompleted) {
    super(event)
    const products = this.toJSON().products
    if (Array.isArray(products)) {
      this.products = products.map(product => new Product(product))
    } else {
      this.products = []
    }
  }

  get affiliation() {
    return this.enforce.string(this.toJSON().affiliation)
  }

  get checkoutId() {
    return this.enforce.stringOrNumber(this.toJSON().checkoutId || this.toJSON().checkout_id as Spec.OrderCompleted["checkoutId"])
  }

  get coupon() {
    return this.enforce.string(this.enforce.string(this.toJSON().coupon))
  }

  get currency() {
    return this.enforce.string(this.toJSON().currency)
  }

  get discount() {
    return this.enforce.stringOrNumber(this.toJSON().discount)
  }

  get orderId() {
    return this.enforce.stringOrNumber(this.toJSON().orderId || this.toJSON().order_id as Spec.OrderCompleted["orderId"])
  }

  get revenue() {
    return this.enforce.number(this.toJSON().revenue)
  }

  get shipping() {
    return this.enforce.string(this.toJSON().shipping)
  }

  get tax() {
    return this.enforce.number(this.toJSON().tax)
  }

  get total() {
    return this.enforce.number(this.toJSON().total)
  }
}

export class ProductList extends Facade<Spec.ProductList> implements Spec.ProductList {
  public products: Product[]
  constructor(event: Spec.ProductList) {
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

export class ProductListViewed extends ProductList {}

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
