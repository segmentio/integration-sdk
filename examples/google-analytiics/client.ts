import axios, { AxiosRequestConfig } from 'axios'
import { PageviewHit, Hit, EventHit } from './types';
import * as qs from 'querystring'

abstract class IntegrationClient {
  abstract endpoint: string
  public get = axios.get
  public async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
    return await axios.post<T>(endpoint, data, config)
  }
}

interface GoogleAnalyticsResponse {
  status: 200
}

export class Client extends IntegrationClient {
  endpoint = 'https://www.google-analytics.com/collect'

  private async request<T extends Hit>(payload: T, userAgent: string) {
    return await this.post<GoogleAnalyticsResponse>(this.endpoint, qs.stringify(payload), {
      headers: {
        'User-Agent': userAgent
      }
    })
  }

  async pageview(payload: PageviewHit, userAgent: string) {
    return await this.request(payload, userAgent)
  }

  async event(payload: EventHit, userAgent: string) {
    return await this.request(payload, userAgent)
  }
}
