import { Integration } from '../../src/integration';
import * as Events from '@segment/spec-ts/events';
import { Track } from '@segment/facade'

interface Settings {}

export class BanjoAnalytics extends Integration {
  constructor(public settings: Settings) {
    super(settings)
    this.subscribe('Order Completed', this.orderCompleted)
    this.subscribe('track', this.track)
  }
  async track(event: Events.Track) {
    const track = new Track(event)
    const id = track.userId
    if (!track.userId) {
      return this.reject('UserId is a required property of all track events')
    }
    console.log(event.event)
  }

  async orderCompleted(event: Events.OrderCompleted) {
    const track = new Track(event)
    console.log(track.properties.revenue)
  }
}
