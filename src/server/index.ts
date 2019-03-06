import { Integration } from '../integration'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as auth from 'basic-auth'
import { InvalidAuthToken, IntegrationResponse, InternalServerError } from '../responses';

const app = express()

export class Server {
  constructor(public Integration: new(authToken: string) => Integration){
    app.use(bodyParser.json())
    app.post('/', this.handle.bind(this))
  }

  private async handle(req: express.Request, res: express.Response) {
    const event = req.body
    const creds = auth(req)

    if (!creds) {
      const error = new InvalidAuthToken()
      return res.status(error.status).send(error)
    }

    try {
      const Integration = this.Integration
      const integration = new Integration(creds.name)
      const r = await integration.handle(event)
      const { status, message } = r
      res.status(status).send(message)
    } catch (error) {
      if (!this.isIntegrationResponse(error)) {
        error = new InternalServerError()
      }
      res.status(error.status).send(error)
    }
  }

  listen(port: number = 3000) {
    app.listen(port)
  }

  private isIntegrationResponse(error: any): error is IntegrationResponse {
    return (typeof error.status === 'number' && error.message && error.name)
  }
}
