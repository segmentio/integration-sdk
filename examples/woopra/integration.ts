import { Integration } from '../../src/integration'
import * as Events from '@segment/spec-ts/events';
import { Mapper } from './mapper';
import { Client } from './client';
import { Track } from '@segment/facade';

export interface Settings {
  domain: string
  timeout: number
}

export class Woopra extends Integration {
  private mapper: Mapper
  private client = new Client()
  constructor(public settings: Settings) {
    super(settings)
    this.mapper = new Mapper(settings)
    this.subscribe('track', this.track)
  }

  async track(event: Events.Track) {
    const track = new Track(event)
    const payload = this.mapper.customEvent(track)
    return await this.client.customEvent(payload)
  }
}
