import { Base } from '../common'

export interface Campaign {
  name?: string
  source?: string
  medium?: string
  term?: string
  content?: string
}
export interface Web extends Base {
  channel: 'web'
  campaign: Campaign
}