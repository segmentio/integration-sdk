import { Facade } from '../../src'
import { Base } from '../../../spec/context/common'
import { Server } from '../../../spec/context/server'
import { Mobile } from '../../../spec/context/mobile'
import { Web } from '../../../spec/context/Web'

/**
 * Base Context
 */
export class BaseContext<T extends Mobile | Web | Server> extends Facade<Base> implements Base {
  constructor(event: T) {
    super(event)
  }

  get channel(): T["channel"] {
    return this.toJSON().channel
  }

  get ip() {
    return this.toJSON().ip
  }

  get locale() {
    return this.toJSON().locale
  }

  get userAgent() {
    return this.enforce.string(this.toJSON().userAgent || this.toJSON().user_agent as Base["userAgent"])
  }
}
