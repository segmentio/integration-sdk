export class ValidationError extends Error {
  constructor(public message: string) {
    super('Validation Error')
  }
}

export class EventNotSupported extends Error {
  constructor(event: 'track' | 'identify' |  'group' | 'page') {
    super(`Event ${event} not supported.`)
  }
}

export class InvalidEventPayload extends Error {
  constructor() {
    super('Invalid Event Payload')
  }
}
