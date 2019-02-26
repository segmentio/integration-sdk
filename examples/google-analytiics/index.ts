import { Integration } from '../../src/integration/index'
import { Success, ValidationError } from '../../src/integration/responses'
import { Track, Identify, OrderCompleted, Message } from '../../lib/facade'
import { Mapper } from './mapper'
import { Client } from './client';

class GoogleAnalytics extends Integration {
  private mapper = new Mapper()
  public client = new Client()

  async track(event: Track) {
    const payload = this.mapper.track(event)
    const res = await this.client.event(payload, this.getUserAgent(event))
    return new Success()
  }

  private getUserAgent<T extends Message>(event: T): string {
    const userAgent = event.context.userAgent
    if (!userAgent) {
      throw new ValidationError('User Agent is Required for All Events.')
    }
    return userAgent
  }
}
