import { Integration } from '../integration'
import { IntegrationResponse } from '../integration/responses'
import { Track, Identify } from '../../packages/facade'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as Spec from '../../packages/spec/methods'

const app = express()

export class Server {
  public integration: Integration

  constructor(IntegrationConstructor: new() => Integration){
    this.integration = new IntegrationConstructor()
    app.use(bodyParser.json())
    app.post('/', this.handle.bind(this))
  }

  async handle(req: express.Request, res: express.Response) {
    const payload = req.body as Spec.Track | Spec.Identify

    try {
      const r = await this.proxyEvent(payload)
      const { status } = r
      res.send({ status })
    } catch (error) {
      let status: number
      if (error.status && typeof error.status === 'number') {
        status = error.status
      } else {
        status = 500
      }
      res.send({ status, error })
    }
  }

  async proxyEvent(event: Spec.Identify | Spec.Track): Promise<IntegrationResponse> {
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

  async handleTrack(event: Spec.Track): Promise<IntegrationResponse> {
    const subscriptions = this.integration.subscriptions
    const eventSubscriptionHandler = subscriptions.get(event.name)

    if (eventSubscriptionHandler) {
      return await eventSubscriptionHandler(new Track(event))
    } else {
      return await this.integration.track(new Track(event))
    }
  }

  async handleIdentify(event: Spec.Identify): Promise<IntegrationResponse> {
    return await this.integration.identify(new Identify(event))
  }
}
