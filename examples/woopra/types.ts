export type BasePayload = {
  /**
   * The name of your project in Woopra.
   * @example "my-project.com"
   */
  project: string
  /**
   * The Cookie should be thought of as a device id. It can also be used for anonymous ids. Required if no cv_{Visitor Identifier}.
   * @example "kDei34gy3h25F"
   */
  cookie?: string
}

export type WoopraEvent = {
  /**
   * The name of the custom event that you are tracking.
   * @example "form_submit"
   */
  event: string
  /**
   * Event timestamp – time in milliseconds since the UNIX epoch that the event occurred. (this can be back-dated, but not in the future.)
   * @example 1489704275615
   */
  timestamp?: string
  /**
   * Visit’s referring URL, Woopra servers will match the URL against a database of referrers and will generate a referrer type and search terms when applicable. The referrers data will be automatically accessible from the Woopra interface
   * @example "www.google.com"
   */
  referrer?: string
  /**
   * IP address of the visitor. If defined, it overrides the physical IP address of the connection.
   * @example "127.0.0.1"
   */
  ip?: string
  /**
   * In milliseconds, defaults to 30000 (equivalent to 30 seconds) after which the event will expire and the visit will be marked as over, and the visitor as offline.
   * @example 4000 (40s)
   */
  timeout?: number
  /**
   * User’s browser. If defined, it overrides the auto-detected browser from the request's user-agent. You can also build your custom user-agent.
   * @example "chrome"
   */
  browser?: string
  /**
   * User’s operating system. If defined, it overrides the auto-detected operating system from user-agent.
   * @example "Windows 10"
   */
  os?: string
  /**
   * User’s device type. If defined, it overrides the auto-detected device type from user-agent. Common values are mobile, tablet and desktop.
   * @example "mobile" or "i-phone"
   */
  device?: string
} & BasePayload

export type WoopraIdentify = BasePayload
