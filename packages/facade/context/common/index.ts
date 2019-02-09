import { Facade } from '../../src'
import * as Spec from '../../../spec/context/common'

export class BaseContext extends Facade<Spec.Base> implements Spec.Base {
  public channel: 'mobile' | 'web' | 'server'
  constructor(event: any) {
    super(event)
    this.channel = event.channel
  }

  get ip() {
    return this.toJSON().ip
  }

  get locale() {
    return this.toJSON().locale
  }

  get timezone() {
    return this.toJSON().timezone
  }

  get userAgent() {
    return this.enforce.string(this.toJSON().userAgent || this.toJSON().user_agent as Spec.Base["userAgent"])
  }
}
