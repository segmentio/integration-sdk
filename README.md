# Introduction
The Segment Integration SDK is a framework designed to help developers build reliable integrations with Segment. Integrations built using this tool are consumers of Segment events, contrary to upstream producers of Segment events. To learn how to send events to Segment, visit our [docs](https://segment.com/docs/sources/).

# Quick Start
## Installation

With `yarn`:
```
yarn add @segment/integration-sdk
```

With `npm`:
```
npm i --save @segment/integration-sdk
```

## Usage
```typescript
// index.ts
import { Integration } from '@segment/integration-sdk/lib/integration'
import { Track, Identify } from '@segment/integration-sdk/lib/facade/events'
import { Success } from '@segment/integration-sdk/lib/responses'

interface Settings {}

export class MyIntegration extends Integration {
  constructor(public settings: Settings) {
    super()
  }

  async track(event: Track) {
    console.log('Track event handled...')
    return new Success()
  }

  async identify(event: Identify) {
    console.log('Identify event handled...')
    return new Success()
  }
}
```

# Documentation
More documentation and a brief tutorial can be found [here](https://segment.gitbook.io/project/-LZ62ZxaRM7vxXe_MLAt/).

# Examples
You can find a simple example of an integration in the `/examples` directory.
