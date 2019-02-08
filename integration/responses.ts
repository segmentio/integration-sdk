type statusCode = 200 | 400 | 500

export interface IntegrationResponse {
  status: statusCode
  name: string
  message: string
}

export class ValidationError implements IntegrationResponse {
  status = 400 as statusCode
  name = 'ValidationError'
  constructor(public message: string) {}
}

export class EventNotSupported implements IntegrationResponse {
  status = 400 as statusCode
  name = 'EventNotSupported'
  message: string
  constructor(event: string) {
    this.message = `Event ${event} not supported.`
  }
}

export class Success implements IntegrationResponse {
  status = 200 as statusCode
  name = 'Success'
  message = 'Success'
}
