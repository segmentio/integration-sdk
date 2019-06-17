import { BadRequest } from 'http-responses-ts'

export class ValidationError extends BadRequest {
  constructor(public message: string) {
    super(message, 'Validation Error')
  }
}

export class EventNotSupported extends BadRequest {
  constructor(event: 'track' | 'identify' |  'group' | 'page') {
    super(`Event ${event} not supported.`, 'Unsupported Event Type')
  }
}

export class InvalidEventPayload extends BadRequest {
  constructor() {
    super('Event Payload is Invalid', 'Invalid Event Payload')
  }
}
