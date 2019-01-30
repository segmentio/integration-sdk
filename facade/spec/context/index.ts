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

type Channels = 'mobile' | 'web' | 'server'

export interface Context {
  channel: Channels
  ip?: string
  locale?: string
  userAgent?: string
  timezone?: string
}

export interface Mobile extends Context {
  channel: 'mobile'
  app: App
  device: Device
}

export interface Web extends Context {
  channel: 'web'
}
