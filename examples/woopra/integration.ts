import { Integration } from '../../src/integration'
import { Track } from '@segment/facade';
import { Mapper } from './mapper';
import { Client } from './client';

export interface Settings {
  domain: string
  timeout: number
}

export class Woopra extends Integration {
  private mapper: Mapper
  private client = new Client()
  constructor(public settings: Settings) {
    super()
    this.mapper = new Mapper(settings)
  }

  async track(event: Track) {
    const payload = this.mapper.customEvent(event)
    return await this.client.customEvent(payload)
  }
}
