import { Integration } from '../integration'
import { IntegrationResponse } from '../integration/responses'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as Spec from '../../lib/spec/methods'

const app = express()

export class Server {
  public integration: Integration

  constructor(IntegrationConstructor: new() => Integration){
    this.integration = new IntegrationConstructor()
    app.use(bodyParser.json())
    app.post('/', this.handleExpressRequest.bind(this))
  }

  async handle(payload: object): Promise<IntegrationResponse> {
    try {
      const res = await this.integration.handle(payload as Spec.Identify | Spec.Track | Spec.Group | Spec.Page)
      return res
    } catch (err) {
      if (!err.status) {
        err.status = 500
      }
      throw err
    }
  }

  private async handleExpressRequest(req: express.Request, res: express.Response) {
    const payload = req.body as Spec.Identify | Spec.Track | Spec.Group | Spec.Page

    try {
      const r = await this.handle(payload)
      const { status } = r
      res.send({ status })
    } catch (error) {
      let status: number
      if (error.status && typeof error.status === 'number') {
        status = error.status
      } else {
        status = 500
      }
      console.error(error)
      res.send({ status, error })
    }
  }

  listen() {
    app.listen(3000)
  }
}
