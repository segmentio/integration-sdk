import { Message } from '../facade/events/';
import * as HttpStatus from 'http-status-codes'

interface HttpResponse {
  status: number
  name: string
  message?: string
}

export class IntegrationResponse implements HttpResponse {
  public name: string
  constructor(public readonly status: number, public message?: string) {
    try {
      this.name = HttpStatus.getStatusText(status)
    } catch (e) {
      this.name = `Unknown Status Code: ${status}`
      this.status = 502
    }
  }
}

export class ValidationError extends IntegrationResponse implements IntegrationResponse {
  constructor(public message: string) {
    super(HttpStatus.BAD_REQUEST, message)
    this.name = 'Validation Error'
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
