import { Integration } from '../integration'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { IntegrationResponse, InternalServerError } from '../responses';
import { IncomingHttpHeaders } from 'http';
import _ from '../utils'

const app = express()

export class Server {
  constructor(public Integration: new(settings: any) => Integration){
    app.use(bodyParser.json())
    app.post('/', this.handle.bind(this))
  }

  private async handle(req: express.Request, res: express.Response) {
    const event = req.body
    try {
      const settings = this.parseSettings(req.headers)
      const Integration = this.Integration
      const integration = new Integration(settings)
      const response = await integration.handle(event)
      res.status(response.status).json(response)
    } catch (error) {
      if (!(error instanceof IntegrationResponse)) {
        error = this.parseError(error)
      }
      res.status(error.status).json(error)
    }
  }

  listen(port: number | string = 3000) {
    app.listen(Number(port))
    console.log(`Listening on port: ${port}`)
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

  private parseError(err: any): IntegrationResponse {
    if (err.status) {
      return new IntegrationResponse(err.status)
    }

    // Axios Response
    if (err.response) {
      return new IntegrationResponse(err.response.status, err.response.statusText)
    }

    return new InternalServerError()
  }

  private isIntegrationResponse(error: any): error is IntegrationResponse {
    return (typeof error.status === 'number' && error.message && error.name)
  }
}
