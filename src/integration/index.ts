import { InvalidEventPayload, ValidationError } from '../errors'
import PubSub from './pubsub'

export class Integration<ResponseType = any> extends PubSub {
  public settings: object

  constructor(settings: object) {
    super()
    this.settings = settings
  }

  public reject(message: string): InvalidEventPayload {
    throw new ValidationError(message)
  }
}
