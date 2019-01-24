export interface Product {
  productId?: string
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

export interface ProductListViewed {
  listId: string
  category:	string
  products: Product[]
}

export interface OrderCompleted {
  /**
   * Checkout ID
   */
  checkoutId?: string
  orderId?: string
  affiliation: string
  total: number
  revenue: number
  shipping: number
  tax: number
  discount: number
  coupon: string
  currency: string
  products: Product[]
}
