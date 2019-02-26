import { Base } from '../common'
import {
  App,
  Device,
  Network,
  OS
} from '../mobile'
import {
  Campaign,
  Window
} from '../web'

export interface Server extends Base {
  app: App
  device: Device
  network: Network
  os: OS
  campaign: Campaign
  page: Window
}
