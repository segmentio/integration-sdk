import { Message } from '../facade/events/';
import * as HttpStatus from 'http-status-codes'

const enum HTTP_STATUS {
  ACCEPTED = 202,
  BAD_GATEWAY = 502,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  CONTINUE = 100,
  CREATED = 201,
  EXPECTATION_FAILED = 417,
  FAILED_DEPENDENCY = 424,
  FORBIDDEN = 403,
  GATEWAY_TIMEOUT = 504,
  GONE = 410,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  IM_A_TEAPOT = 418,
  INSUFFICIENT_SPACE_ON_RESOURCE = 419,
  INSUFFICIENT_STORAGE = 507,
  INTERNAL_SERVER_ERROR = 500,
  LENGTH_REQUIRED = 411,
  LOCKED = 423,
  METHOD_FAILURE = 420,
  METHOD_NOT_ALLOWED = 405,
  MOVED_PERMANENTLY = 301,
  MOVED_TEMPORARILY = 302,
  MULTI_STATUS = 207,
  MULTIPLE_CHOICES = 300,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
  NO_CONTENT = 204,
  NOT_ACCEPTABLE = 406,
  NOT_FOUND = 404,
  NOT_IMPLEMENTED = 501,
  NOT_MODIFIED = 304,
  OK = 200,
  PARTIAL_CONTENT = 206,
  PAYMENT_REQUIRED = 402,
  PERMANENT_REDIRECT = 308,
  PRECONDITION_FAILED = 412,
  PRECONDITION_REQUIRED = 428,
  PROCESSING = 102,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  REQUEST_TIMEOUT = 408,
  REQUEST_TOO_LONG = 413,
  REQUEST_URI_TOO_LONG = 414,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  RESET_CONTENT = 205,
  SEE_OTHER = 303,
  SERVICE_UNAVAILABLE = 503,
  SWITCHING_PROTOCOLS = 101,
  TEMPORARY_REDIRECT = 307,
  TOO_MANY_REQUESTS = 429,
  UNAUTHORIZED = 401,
  UNPROCESSABLE_ENTITY = 422,
  UNSUPPORTED_MEDIA_TYPE = 415,
  USE_PROXY = 305
}

interface HttpResponse {
  status: HTTP_STATUS
  name: string
  message?: string
}

export class IntegrationResponse implements HttpResponse {
  public name: string
  constructor(public readonly status: HttpResponse["status"], public message?: string) {
    this.name = HttpStatus.getStatusText(status)
  }
}

export class ValidationError extends IntegrationResponse implements IntegrationResponse {
  constructor(public message: string) {
    super(400, message)
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
