import { BaseContext } from '../common'
import { Facade } from '../../src'
import * as Spec from '../../../spec/context/web'

export class Web extends BaseContext implements Spec.Web {
  channel = 'web' as 'web'
  public campaign: Campaign
  constructor(properties: any) {
    super(properties)
    this.campaign = new Campaign(properties.campaign)
  }
}

export class Campaign extends Facade<Spec.Campaign> implements Spec.Campaign {
  constructor(event: any) {
    super(event)
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