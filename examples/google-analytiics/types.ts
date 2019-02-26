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
} & (ClientId | UserId)

export type WebPayload = {
  /**
   * Document Referrer
   * Specifies which referral source brought traffic to a website. This value is also used to compute the traffic source. The format of this value is a URL.
   */
  dr?: string
  dp?: string
  dh?: string
  dl?: string
}

export type PageviewHit = {
  t: 'pageview'
} & WebPayload & AllHits & (DocumentLocationUrl | (DocumentHostName & DocumentPath))

export type EventHit = {
  t: 'event'
  ec: string
  ea: string
} & AllHits

export type TransactionHit = {
  t: 'transaction'
  /**
   * Transaction ID
   * A unique identifier for the transaction. This value should be the same for both the Transaction hit and Items hits associated to the particular transaction.
   */
  ti: string
} & AllHits

export interface ItemHit {
  ti: string
}

export type Hit = TransactionHit | PageviewHit | EventHit
