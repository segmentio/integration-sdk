import { Integration } from '../../src/integration'
import { Track } from '../../packages/facade'
import { Success } from '../../src/integration/responses'

export class BanjoAnalytics extends Integration {
  async track(event: Track) {
    console.log(event.name)
    return new Success()
  }
}
