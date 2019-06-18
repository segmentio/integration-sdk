# Introduction
The Segment Integration SDK is a framework designed to help developers build reliable integrations with Segment. Integrations built using this tool are consumers of Segment events, contrary to upstream producers of Segment events. To learn how to send events to Segment, visit our [docs](https://segment.com/docs/sources/).

# Quick Start
## Installation

With `yarn`:
```
yarn add @segment/integration-sdk @segment/spec-ts
```

With `npm`:
```
npm i --save @segment/integration-sdk @segment/spec-ts
```

## Basic Usage
```typescript
// index.ts
import { Integration } from '@segment/integration-sdk'
import { Track, Identify, OrderCompleted } from '@segment/spec-ts'

interface Settings {}

export class MyIntegration extends Integration {
  constructor(public settings: Settings) {
    super(settings)
    this.subscribe('track', this.track)
    this.subscribe('identify', this.identify)
    this.subscribe('Order Completed', this.orderCompleted)
  }

  async track(event: Track) {
    console.log('Track event handled...')
  }

  async identify(event: Identify) {
    console.log('Identify event handled...')
  }

  async orderCompleted(event: OrderCompleted) {
    console.log(event.properties.revenue)
  }
}
```

# Examples
You can find a simple examples in the `/examples` directory.
