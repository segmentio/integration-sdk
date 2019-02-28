/**
 * [Currency](https://developers.google.com/analytics/devguides/collection/protocol/v1/reference#currency)
 * @description Used to represent the total value of a currency. A decimal point is used as a delimiter between the whole and fractional portion of the currency. The precision is up to 6 decimal places. The following is valid for a currency field: 1000.000001. Once the value is sent to Google Analytics, all text is removed up until the first digit, the - character or the . (decimal) character. So: $-55.00 will become: -55.00
 */
type currency = string

export interface UserId {
  uid: string
}

export interface ClientId {
  cid: string
}

export interface DocumentLocationUrl {
  dl: string
}

export interface DocumentHostName {
  dh: string
}

export interface DocumentPath {
  dp: string
}

export type HitType = 'pageview' | 'screenview' | 'event' | 'transaction' | 'item' | 'social' | 'exception' | 'timing'

export type ProductAction =  'detail' | 'click' | 'add' | 'remove' | 'checkout' | 'checkout_option' | 'purchase' | 'refund'

export type AllHits = {
  /**
   * Protocol Version
   * The protocol version. The value should be 1.
   */
  v: 1
  /**
   * [Tracking ID / Web Property ID](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#tid)
   * The tracking ID / web property ID. The format is UA-XXXX-Y. All collected data is associated by this ID.
   */
  tid: string
  /**
   * IP Override
   * The IP address of the user. This should be a valid IP address in IPv4 or IPv6 format. It will always be anonymized just as though &aip (anonymize IP) had been used.
   */
  uip?: string
  /**
   * User Agent Override
   * The User Agent of the browser. Note that Google has libraries to identify real user agents. Hand crafting your own agent could break at any time.
   */
  ua?: string
  /**
   * Geographical Override
   * The geographical location of the user. The geographical ID should be a two letter country code or a criteria ID representing a city or region (see http://developers.google.com/analytics/devguides/collection/protocol/v1/geoid). This parameter takes precedent over any location derived from IP address, including the IP Override parameter. An invalid code will result in geographical dimensions to be set to '(not set)'.
   */
  geoid?: string
} & ContentInformation & (ClientId | UserId)

export type EnhancedEcommerceParameters = {
  /**
   * [Promotion Action](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#promoa)
   * @description Specifies the role of the promotions included in a hit. If a promotion action is not specified, the default promotion action, 'view', is assumed. To measure a user click on a promotion set this to 'promo_click'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   */
  promoa?: string
  /**
   * [Currency Code](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cu)
   * @description When present indicates the local currency for all transaction currency values. Value should be a valid ISO 4217 currency code.
   */
  cu?: string
}

export type ContentInformation = {
  /**
   * Document Referrer
   * Specifies which referral source brought traffic to a website. This value is also used to compute the traffic source. The format of this value is a URL.
   */
  dr?: string
  dp?: string
  /**
   * Document Host Name
   * @description Specifies the hostname from which content was hosted.
   */
  dh?: string
  /**
   * Document location URL
   * Use this parameter to send the full URL (document location) of the page on which content resides. You can use the &dh and &dp parameters to override the hostname and path + query portions of the document location, accordingly. The JavaScript clients determine this parameter using the concatenation of the document.location.origin + document.location.pathname + document.location.search browser parameters. Be sure to remove any user authentication or other private information from the URL if present. For 'pageview' hits, either &dl or both &dh and &dp have to be specified for the hit to be valid.
   */
  dl?: string
}

export type PageviewHit = {
  t: 'pageview'
} & ContentInformation & AllHits & EnhancedEcommerceParameters & (DocumentLocationUrl | (DocumentHostName & DocumentPath))

export type EventHit = {
  t: 'event'
  ec: string
  ea: string
  ev?: number
} & AllHits & EnhancedEcommerceParameters

export type TransactionHit = {
  t: 'transaction'
  /**
   * [Transaction ID](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ti)
   * @description A unique identifier for the transaction. This value should be the same for both the Transaction hit and Items hits associated to the particular transaction.
   */
  ti: string
  /**
   * [Transaction Affiliation](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ta)
   * @description Specifies the affiliation or store name.
   */
  ta?: string
  /**
   * [Transaction Revenue](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#tr)
   * @description Specifies the total revenue associated with the transaction. This value should include any shipping or tax costs.
   */
  tr?: currency
  /**
   * [Transaction Shipping](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ts)
   * @description Specifies the total shipping cost of the transaction.
   */
  ts?: currency
  /**
   * [Transaction Tax](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#tt)
   * @description Specifies the total tax of the transaction.
   */
  tt?: currency
} & AllHits

export type EnhancedTransactionHit = TransactionHit & EnhancedEcommerceParameters

export type ItemHit = {
  t: 'item'
  /**
   * [Item Name](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#in)
   * Specifies the item name.
   */
  in: string
  /**
   * [Item Price](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ip)
   * Specifies the price for a single item / unit.
   */
  ip?: currency
  /**
   * [Item Quantity](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#iq)
   * Specifies the number of items purchased.
   */
  iq?: number
  /**
   * [Item Code](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ic)
   * Specifies the SKU or item code.
   */
  ic?: string
  /**
   * [Item Category](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#iv)
   * Specifies the category that the item belongs to.
   */
  iv?: string
} & AllHits

export type Hit = TransactionHit | PageviewHit | EventHit | ItemHit
