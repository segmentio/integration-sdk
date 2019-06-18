import { Integration } from '.';
import assert from 'assert'
import sinon from 'sinon'
import { Track } from '@segment/spec-ts';

describe('Integration', () =>  {
  class MyIntegration extends Integration {
    constructor(settings: {}) {
      super(settings)
    }
  }

  let myIntegration: MyIntegration

  beforeEach(() => {
    myIntegration = new MyIntegration({})
  })

  describe('#subscribe', () => {
    it('should save subscriptions in the .subscriptions map', () => {
      const myIntegration =  new MyIntegration({})
      const productListFilteredStub = sinon.stub()
      const orderUpdatedStub = sinon.stub()
      myIntegration.subscribe('Product List Filtered', productListFilteredStub)
      myIntegration.subscribe('Order Updated', orderUpdatedStub)
      assert.strictEqual(typeof myIntegration.subscriptions.get('Product List Filtered') === 'function', true)
      assert.strictEqual(typeof myIntegration.subscriptions.get('Order Updated') === 'function', true)
    })

    it('should bind subscriptions to the integration class', async () => {
      class MyOtherIntegration extends Integration {
        constructor(settings: {}) {
          super(settings)
          this.subscribe('track', this.track)
        }
        async track(event: Track) {
          assert(this instanceof MyOtherIntegration)
        }
      }

      const i = new MyOtherIntegration({})
      await i.publish({ event: 'Foo', type: 'track' })
    })
  })

  describe('#publish', () => {
    it('should properly route subscribed events to the correct handler', async () => {
      const stub = sinon.stub()
      myIntegration.subscribe('identify', stub)
      await myIntegration.publish({ type: 'identify' })
      assert(stub.calledOnceWith({ type: 'identify' }))
    })

    it('should route spec events without a subscription to the default track handler', async () => {
      const stub = sinon.stub()
      myIntegration.subscribe('track', stub)
      await myIntegration.publish({ type: 'track', event: 'Order Updated' })
      assert(stub.calledOnceWith({ type: 'track', event: 'Order Updated' }))
    })
  })
})
