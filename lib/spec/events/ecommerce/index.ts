export interface Product {
  productId?: string | number
  sku?: string
  category?: string
  name?: string
  brand?: string
  variant?: string
  price?: number
  quantity?: number
  coupon?: string
  position?: number
  url?: string
  imageUrl?: string
}

export interface Filter {
  /**
   * Id of the filter type that the customer is using
   */
  type?: string
  /**
   * Id of the selection that the customer chose
   */
  value?: string
}

export interface Sorts {
  /**
   * Id of the sort type that the customer is using
   */
  type?: string
  /**
   * Id of the selection type the the customer is using (ascending, descending)
   */
  value?: string
}

export interface ProductListViewed {
  listId: string
  category:	string
  products: Product[]
}

export interface ProductListFiltered extends ProductListViewed {
  /**
   * Product filters that the customer is using
   */
  filters?: Filter[]
  /**
   * Product sorting that the customer is using
   */
  sorts?: Sorts[]
}

export interface PromotionViewed {
  promotionId?: string
  creative?: string
  name?: string
  position?: number
}

export interface PromotionClicked extends PromotionViewed {}

export interface ProductClicked extends Product {}

export interface ProductViewed extends Product {}

export interface ProductAdded extends Product {}

export interface ProductRemoved extends Product {}

export interface CartViewed {
  cartId?: string
  products: Product[]
}

export interface CheckoutStarted {
  /**
   * Checkout transaction ID
   */
  checkoutId?: string | number
  orderId?: string
  affiliation?: string
  total?: number
  revenue?: number
  shipping?: number
  tax?: number
  discount?: number
  /**
   * Coupon Id
   */
  coupon?: string
  currency?: string
  products: Product[]
}

export interface CheckoutStepViewed {
  /**
   * Checkout transaction ID
   */
  checkoutId?: string
  step?: number
  shippingMethod?: string
  paymentMethod?: string
}

export interface CheckoutStepCompleted extends CheckoutStepViewed {}

export interface PaymentInfoEntered extends CheckoutStepViewed {
  orderId?: string
}

export interface OrderUpdated extends CheckoutStarted {}

export interface OrderCompleted extends CheckoutStarted {}

export interface OrderRefunded extends CheckoutStarted {
  orderId?: string
}

export interface OrderCancelled extends CheckoutStarted {}
