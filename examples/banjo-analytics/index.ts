import { BanjoAnalytics } from './integration'
import { Server } from '../../src/server';

const server = new Server(BanjoAnalytics)

server.listen(3000)
