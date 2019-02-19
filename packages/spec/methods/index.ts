import { Mobile } from '../context/mobile'
import { Web, Window } from '../context/web'

export type Methods = 'track' | 'identify' | 'page' | 'group'

export interface BasePayload {
  messageId: string
  receivedAt: string
  sentAt: string
  timestamp: string
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

export interface Page extends BasePayload {
  type: 'page'
  properties: Window
}

export interface Company {
  name?: string
  industry?: string
  employees?: number
  plan?: string
  totalBilled?: number
}

export interface Group extends BasePayload {
  type: 'group'
  traits: Company
}
