import { Facade } from '../../src'

export class User extends Facade {
  get email() {
    return this.toJSON().email
  }

  get firstName() {
    return this.toJSON().firstName || this.toJSON().first_name
  }

  get lastName() {
    return this.toJSON().lastName || this.toJSON().last_name
  }
}
