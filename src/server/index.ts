import { Integration } from '../integration'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { InternalServerError, HttpResponse } from '../responses';
import * as http from 'http';
import _ from '../utils'
const app = express()

export class Server {
  private server?: http.Server

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
      return res.status(response.statusCode).json(response)
    } catch (error) {
      let response: HttpResponse
      if (error instanceof HttpResponse) {
        response = error
        res.status(response.statusCode).json(response)
      // If an error is not an instance of an HttpError, we treat it as an uncaught exception.
      } else {
        response = new InternalServerError()
        res.status(response.statusCode).json(response)
        await this.close()
        console.error(error)
        process.exit(1)
      }
    }
  }

  listen(port: number | string = 3000) {
    this.server = app.listen(Number(port))
    console.log(`Listening on port: ${port}`)
  }

  async close() {
    return new Promise((resolve, reject) => {
      if (this.server) {
        return this.server.close(resolve)
      }
      resolve()
    })
  }

  private parseSettings(headers: http.IncomingHttpHeaders): object {
    const settings = headers['X-Settings']
    if (settings && _.isObject(settings)) {
      return settings
    }

    return _.mapKeys(headers, (value, key) => {
      return _.camelCase(key)
    })
  }
}
