import { BadRequest } from 'http-responses-ts'
import { Message } from '../facade/events/';

export class ValidationError extends BadRequest {
  constructor(public message: string) {
    super(message, 'Validation Error')
  }
}

export class EventNotSupported<T extends Message> extends BadRequest {
  constructor(event: T["type"]) {
    super(`Event ${event} not supported.`, 'Unsupported Event Type')
  }
}

export class InvalidEventPayload extends BadRequest {
  constructor() {
    super('Event Payload is Invalid', 'Invalid Event Payload')
  }
}

export * from 'http-responses-ts'
