import { Integration } from '../integration'
import * as bodyParser from 'body-parser'
import * as express from 'express'

const app = express()

export class Server {
  constructor(public Integration: new(settings: object) => Integration){
    app.use(bodyParser.json())
    app.post('/', this.handle.bind(this))
  }

  private async handle(req: express.Request, res: express.Response) {
    const { event, settings} = req.body
    const Integration = this.Integration
    const integration = new Integration(settings)
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
      console.error(error)
      res.send({ status, error })
    }
  }

  listen(port: number = 3000) {
    app.listen(port)
  }
}
