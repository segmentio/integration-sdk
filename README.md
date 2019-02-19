# Introduction
The Segment Integration SDK is a framework designed to help developers build reliable integrations with Segment. Integrations built using this tool are consumers of Segment events, contrary to upstream producers of Segment events. To learn how to send events to Segment, visit our [docs](https://segment.com/docs/sources/).

# Getting Started
Documentation and a quick start guide can be found [here](https://segment.gitbook.io/project/-LZ62ZxaRM7vxXe_MLAt/)

# Examples
You can find an example of an abridged integration with the [Amplitude API](https://amplitude.zendesk.com/hc/en-us/articles/204771828-HTTP-API) in the `/examples` directory. To run the server and start sending events to the integration, run:

```
$ npm build
$ node dist/examples/amplitude/index.js
$ curl http://localhost:3000 -H "Content-Type: application/json" -d '{"type": "track", "name": "Order Completed", "properties": { "productId": "foo" } }'
```
