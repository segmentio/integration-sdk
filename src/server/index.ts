import { Integration } from '../integration'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { IntegrationResponse, InternalServerError } from '../responses';
import { IncomingHttpHeaders } from 'http';
import _ from '../utils'

const app = express()

export class Server {
  constructor(public Integration: new(settings: object) => Integration){
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
      const settings = this.parseSettings(req.headers)
      const Integration = this.Integration
      const integration = new Integration(settings)
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

  private parseSettings(headers: IncomingHttpHeaders): object {
    const settings = headers['X-Settings']
    if (settings && _.isObject(settings)) {
      return settings
    }

    return _.mapKeys(headers, (value, key) => {
      return _.camelCase(key)
    })
  }

  private isIntegrationResponse(error: any): error is IntegrationResponse {
    return (typeof error.status === 'number' && error.message && error.name)
  }
}
