import { Message } from './message'
import { Facade } from '../src'
import { Identify as Spec } from '../../../../spec/events/identify'

export class Identify extends Message implements Spec {
  public type: Spec["type"]
  public traits: Facade
  constructor(event: Spec) {
    super(event)
    this.type = event.type
    this.traits = new Facade(event.traits)
  }
}
