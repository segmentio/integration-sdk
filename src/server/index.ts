import { Integration } from '../integration'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as auth from 'basic-auth'
import { InvalidAuthToken } from '../responses';

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
      return res.send({ status: error.status, error })
    }

    const Integration = this.Integration
    const integration = new Integration(creds.name)

    try {
      const r = await integration.handle(event)
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

  listen(port: number = 3000) {
    app.listen(port)
  }
}
