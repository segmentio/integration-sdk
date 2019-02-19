export interface UserId {
  user_id: string
}

export interface DeviceId {
  device_id: string
}

export interface MobilePayload {
  app_version?: string
}

export type BasePayload = {
  time?: string
  event_properties?: object
  user_properties?: object
} & MobilePayload & (UserId | DeviceId)

export type TrackPayload = {
  event_type: string
} & BasePayload

export type RevenuePayload = {
  revenueType?: string
  productId?: string
  price: number
  quantity: number
} & BasePayload
