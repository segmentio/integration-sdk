import * as Ecommerce from '../events/ecommerce'
import { Mobile } from '../context/mobile'
import { Web, Window } from '../context/web'
import { Server } from '../context/server'

export type Methods = 'track' | 'identify' | 'page' | 'group'

export interface BasePayload {
  messageId: string
  receivedAt: string
  sentAt: string
  timestamp: string
  type: Methods
  userId?: string
  anonymousId?: string
  context: Web | Mobile | Server
}

export interface Track<T = { [key: string]: any }> extends BasePayload {
  type: 'track'
  name: string
  properties: T
}

export interface OrderCompleted extends Track<Ecommerce.OrderCompleted> {
  name: 'Order Completed'
}

export interface Identify extends BasePayload {
  type: 'identify'
  traits: object
}

export interface Page extends BasePayload {
  type: 'page'
  properties: { [key: string]: any } & Window
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
  traits: { [key: string]: any } & Company
}
