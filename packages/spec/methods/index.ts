import { Mobile } from '../context/mobile'
import { Web } from '../context/web'

export type Methods = 'track' | 'identify'

export interface BasePayload {
  type: Methods
  userId?: string
  anonymousId?: string
  context: Web | Mobile
}

export interface Track<T = { [key: string]: any }> extends BasePayload {
  type: 'track'
  name: string
  properties: T
}

export interface Identify extends BasePayload {
  type: 'identify'
  traits: object
}
