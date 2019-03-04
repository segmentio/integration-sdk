import * as Spec from '../../../../../spec/types/common'
import { Facade } from '../../src'

export class Company extends Facade<Spec.Company> {
  get name() {
    return this.enforce.string(this.getProperties().name)
  }

  get industry() {
    return this.enforce.string(this.getProperties().industry)
  }

  get employees() {
    return this.enforce.stringOrNumber(this.getProperties().employees)
  }

  get plan() {
    return this.enforce.string(this.getProperties().plan)
  }

  get totalBilled() {
    return this.enforce.stringOrNumber(this.getProperties().totalBilled || this.getProperties().total_billed || this.getProperties()['total billed']) as Spec.Company["totalBilled"]
  }
}
