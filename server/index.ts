import { Integration } from '../integration'
import { IntegrationError } from '../errors'
import { Track, Identify } from '../facade/methods'
import * as bodyParser from 'body-parser'
import * as express from 'express'

const app = express()

type EventTypes = 'track' | 'identify'

interface Payload {
  type: EventTypes
  userId?: string
  anonymousId?: string
  context: {
    channel: 'web' | 'mobile'
  }
}

export interface IdentifyPayload extends Payload {
  type: 'identify'
  traits: object
}

export interface TrackPayload extends Payload {
  type: 'track'
  name: string
  properties: object
}

export type EventPayload = IdentifyPayload | TrackPayload

interface CentrifugeResponse {
  status: number
  error?: Error
}

export class Server {
  public integration: Integration

  constructor(IntegrationConstructor: new() => Integration){
    this.integration = new IntegrationConstructor()
    app.use(bodyParser.json())
    app.post('/', this.handle.bind(this))
  }

  async handle(req: express.Request, res: express.Response) {
    const payload = req.body as EventPayload

    try {
      const r = await this.proxyEvent(payload)
      const { status } = r
      res.send({ status })
    } catch (error) {
      let status: number

      if (error instanceof IntegrationError) {
        status = error.status
      } else {
        status = 500
      }
      console.error(error)
      res.send({ status, error })
    }
  }

  async proxyEvent(event: EventPayload): Promise<IntegrationResponse> {
    if (event.type === 'identify') {
      return await this.handleIdentify(event)
    }

    if (event.type === 'track') {
      return await this.handleTrack(event)
    }

    // This line will not be reachable but must be defined for TS exhaustiveness checks.
    throw new Error(`Could not recognize event type ${event!.type}`)
  }

  listen() {
    app.listen(3000)
  }

  async handleTrack(event: TrackPayload): Promise<IntegrationResponse> {
    let handler
    const subscriptions = this.integration.subscriptions
    const eventSubscriptionHandler = subscriptions.get(event.name)

    if (eventSubscriptionHandler) {
      handler = eventSubscriptionHandler
    } else {
      handler = this.integration.track
    }

    return await handler(new Track(event))
  }

  async handleIdentify(event: IdentifyPayload): Promise<IntegrationResponse> {
    return await this.integration.identify(new Identify(event))
  }
}
