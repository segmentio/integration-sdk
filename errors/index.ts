export abstract class IntegrationError extends Error {
  abstract status: number
}

export class ValidationError extends IntegrationError {
  status = 400
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class EventNotSupported extends IntegrationError {
  status = 400
  constructor(event: string) {
    super(`Event ${event} not supported.`)
    this.name = 'EventNotSupported'
  }
}
