import { WoopraEvent, WoopraIdentify } from './types'
import axios, { AxiosResponse } from 'axios'
import _ from '../../src/utils'
import { HttpResponse } from '../../src/responses';

export interface WoopraResponse extends AxiosResponse {
  status:
    | 200 // Processed. Request has been received and logged
    | 202 // Queued. Request could not be processed within 300 ms due to load, so it has been queued.
    | 401 // Unauthorized: you have secure tracking enabled, but the request is not authenticated
    | 402 // Over Quota: Your project has reached its quota for number of actions tracked. Tracking data is logged, but triggers are not run, and interface is locked out. Upgrade to see your data.
    | 403 // Forbidden: Your project is not registered, or you have defined exclusions for this visitor
    | 500 // There has been a server error. Please double check your request format, then report to support@woopra.com.
}

export class Client {
  private endpoint = 'http://www.woopra.com'

  async customEvent(payload: WoopraEvent) {
    return await this.request('/track/ce', payload)
  }

  async identify(payload: WoopraIdentify) {
    return await this.request('/track/identify', payload)
  }

  private async request(
    path: '/track/ce' | '/track/identify',
    payload: WoopraEvent | WoopraIdentify
  ): Promise<HttpResponse> {
    const res = await axios.get(this.endpoint + path, {
      params: _.deepReject(payload),
      // No need to throw at all. Woopra's API returns sensible responses.
      validateStatus: () => true
    })
    return new HttpResponse({
      message: res.statusText,
      statusCode: res.status
    })
  }
}
