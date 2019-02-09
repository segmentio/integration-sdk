import { Base } from '../common'

export interface Mobile extends Base {
  channel: 'mobile'
  app: App
  device: Device
  os: OS
  network: Network
}

export interface App {
  name?: string
  version?: string
  build?: string
}

export interface Device {
  id?: string
  manufacturer?: string
  model?: string
  name?: string
  type?: string
  version?: string
}

export interface Network {
  bluetooth?: boolean
  carrier?: string
  cellular?: string
  wifi?: boolean
}

export interface OS {
  name?: string
  version?: string
}
