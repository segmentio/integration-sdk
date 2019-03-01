import * as Spec from '../../../../../spec/types/common'
import { Facade } from '../../src'

export class Company extends Facade<Spec.Company> {
  get name() {
    return this.toJSON().name
  }

  get industry() {
    return this.toJSON().industry
  }

  get employees() {
    return this.toJSON().employees
  }

  get plan() {
    return this.toJSON().plan
  }

  get totalBilled() {
    return this.enforce.number(this.toJSON().totalBilled || this.toJSON().total_billed || this.toJSON()['total billed']) as Spec.Company["totalBilled"]
  }
}
