import { Facade } from '../../src'
import * as Spec from '../../../../../spec/types/web'

export class Campaign extends Facade<Spec.Campaign> implements Spec.Campaign {
  constructor(properties: Spec.Campaign) {
    super(properties)
  }

  get content() {
    return this.enforce.string(this.toJSON().content)
  }

  get medium() {
    return this.enforce.string(this.toJSON().medium)
  }

  get name() {
    return this.enforce.string(this.toJSON().name)
  }

  get source() {
    return this.enforce.string(this.toJSON().source)
  }

  get term() {
    return this.enforce.string(this.toJSON().term)
  }
}

export class Window extends Facade<Spec.Window> implements Spec.Window {
  get path() {
    return this.toJSON().path
  }

  get referrer() {
    return this.toJSON().referrer
  }

  get search() {
    return this.toJSON().search
  }

  get title()  {
    return this.toJSON().title
  }

  get url() {
    return this.toJSON().url
  }
}