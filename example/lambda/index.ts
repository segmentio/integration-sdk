import { Server } from '../../src/server'
import { BanjoAnalytics } from './integration'

const server = new Server(BanjoAnalytics)

export const handler: AWSLambda.APIGatewayProxyHandler = async (event: AWSLambda.APIGatewayProxyEvent) => {
  if (!event.body) {
    return { statusCode: 400, body: 'Nope!' }
  }

  const res = await server.handle(JSON.parse(event.body))

  return { statusCode: res.status, body: 'Yayy' }
}
