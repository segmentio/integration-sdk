import { BanjoAnalytics } from './integration'
import { Server } from '../server';

const server = new Server(BanjoAnalytics)

server.listen(3000)
