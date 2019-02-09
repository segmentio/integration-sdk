type Channels = 'mobile' | 'web' | 'server'

export interface Base {
  channel: Channels
  ip?: string
  locale?: string
  userAgent?: string
  timezone?: string
}
