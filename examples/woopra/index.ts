import { Server } from '../server'
import { Woopra } from './integration'

const server = new Server(Woopra)

server.listen()
