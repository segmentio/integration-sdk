import { Facade } from '../../src'
import * as Spec from '@segment/spec/types/web'

export class Campaign extends Facade<Spec.Campaign> implements Spec.Campaign {
  constructor(properties: Spec.Campaign) {
    super(properties)
  }

  get content() {
    return this.enforce.string(this.getProperties().content)
  }

  get medium() {
    return this.enforce.string(this.getProperties().medium)
  }

  get name() {
    return this.enforce.string(this.getProperties().name)
  }

  get source() {
    return this.enforce.string(this.getProperties().source)
  }

  get term() {
    return this.enforce.string(this.getProperties().term)
  }
}

export class Window extends Facade<Spec.Window> implements Spec.Window {
  get path() {
    return this.getProperties().path
  }

  get referrer() {
    return this.getProperties().referrer
  }

  get search() {
    return this.getProperties().search
  }

  get title()  {
    return this.getProperties().title
  }

  get url() {
    return this.getProperties().url
  }
}
