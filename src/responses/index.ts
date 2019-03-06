import { Message } from '../facade/events/';

type statusCode = 200 | 400 | 401 | 403 | 500 | 501

export interface IntegrationResponse {
  status: statusCode
  name: string
  message: string
}

export class MissingRequiredProperty<T extends { [x: string]: any }, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4], K6 extends keyof T[K1][K2][K3][K4][K5]> implements IntegrationResponse {
  status = 400 as statusCode
  name = 'MissingRequiredProperty'
  message ='string'
  constructor(root: T, key1: K1)
  constructor(root: T, key1: K1, key2?: K2)
  constructor(root: T, key1: K1, key2?: K2, key3?: K3)
  constructor(root: T, key1: K1, key2?: K2, key3?: K3, key4?: K4)
  constructor(root: T, key1: K1, key2?: K2, key3?: K3, key4?: K4, key5?: K5)
  constructor(root: T, key1: K1, key2?: K2, key3?: K3, key4?: K4, key5?: K5, key6?: K6) {
    const path = Array.from(arguments).slice(1).join('.')
    this.message = `Missing required property: ${path}.`
  }
}

export class ValidationError implements IntegrationResponse {
  status: statusCode = 400
  name = 'ValidationError'
  constructor(public message: string) {}
}

export class InvalidAuthToken implements IntegrationResponse {
  status: statusCode = 401
  name = 'InvalidAuthToken'
  message = 'Authorization Token is Invalid or Malformed'
}

export class Unauthorized implements IntegrationResponse {
  status: statusCode = 403
  name = 'Unauthorized'
  message = 'Unauthorized'
}

export class EventNotSupported<T extends Message> implements IntegrationResponse {
  status: statusCode = 501
  name = 'EventNotSupported'
  message: string
  constructor(event: T["type"]) {
    this.message = `Event ${event} not supported.`
  }
}

export class Success implements IntegrationResponse {
  status: statusCode = 200
  name = 'Success'
  message = 'Success!'
}

export class InvalidEventPayload implements IntegrationResponse {
  status: statusCode = 400
  name = 'InvalidEventPayload'
  message = 'Event Payload is Invalid'
}

export class InternalServerError implements IntegrationResponse {
  status: statusCode = 500
  name = 'InternalServerError'
  message = 'Internal Server Error'
}
