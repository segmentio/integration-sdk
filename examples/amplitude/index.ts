import { Integration } from '../../src/integration/index'
import { Success } from '../../src/integration/responses'
import { Track, Identify, OrderCompleted } from '../../packages/facade'
import { Server } from '../../src/server'
import { Mapper } from './mapper'

class Amplitude extends Integration {
  private mapper = new Mapper()
  constructor() {
    super()
    this.subscribe<OrderCompleted>('Order Completed', this.orderCompleted)
  }

  async orderCompleted(event: Track<OrderCompleted>) {
    const payload = this.mapper.orderCompleted(event)
    return new Success()
  }

  async track(event: Track) {
    const payload = this.mapper.track(event)
    console.log(payload)
    return new Success()
  }

  async identify(event: Identify) {
    console.log(event.traits.email)
    return new Success()
  }
}

const server = new Server(Amplitude)

server.listen()
