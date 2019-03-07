import { Message } from '../facade/events/';
import * as HttpStatus from 'http-status-codes'

interface HttpResponse {
  status: HttpStatus.HTTP_STATUS
  name: string
  message?: string
}

export class IntegrationResponse implements HttpResponse {
  public name: string
  constructor(public readonly status: HttpStatus.HTTP_STATUS, public message?: string) {
    this.name = HttpStatus.getStatusText(status)
  }
}

export class ValidationError extends IntegrationResponse implements IntegrationResponse {
  name = 'ValidationError'
  constructor(public message: string) {
    super(400, message)
  }
}

export class Accepted extends IntegrationResponse {
  constructor(message?: string) {
    super(HttpStatus.ACCEPTED, message)
  }
}

export class BadRequest extends IntegrationResponse {
  constructor(message?: string) {
    super(HttpStatus.BAD_REQUEST, message)
  }
}

export class Forbidden extends IntegrationResponse {
  constructor(message?: string) {
    super(HttpStatus.BAD_REQUEST, message)
  }
}

export class InternalServerError extends IntegrationResponse {
  constructor(message?: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message)
  }
}

export class PaymentRequired extends IntegrationResponse {
  constructor(message?: string) {
    super(HttpStatus.PAYMENT_REQUIRED, message)
  }
}

export class Success extends IntegrationResponse {
  constructor() {
    super(HttpStatus.OK)
  }
}

export class EventNotSupported<T extends Message> extends IntegrationResponse {
  message: string
  constructor(event: T["type"]) {
    super(HttpStatus.METHOD_NOT_ALLOWED)
    this.name = 'Event Not Supported'
    this.message = `Event ${event} not supported.`
  }
}

export class InvalidEventPayload extends IntegrationResponse {
  constructor() {
    super(HttpStatus.BAD_REQUEST, 'Event Payload is Invalid')
    this.name = 'Invalid Event Payload'
  }
}
