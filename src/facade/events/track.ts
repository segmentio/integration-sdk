import { Message } from './message'
import { Facade } from '../src'
import { Track as Spec } from '@segment/spec/events/'

export class Track<T extends Facade = Facade> extends Message implements Spec {
  public type: Spec["type"]
  public event: string
  public properties: T
  constructor(event: Spec) {
    super(event)
    this.type = event.type
    this.event = event.event
    this.properties = new Facade(event.properties) as T
  }
}
