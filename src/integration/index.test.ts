import { Integration } from '.';
import assert from 'assert'
import sinon from 'sinon'
import { Identify, Page, Track, Group, OrderUpdated } from '@segment/facade';

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

    it('should not allow subscribing to unknown spec events', () => {
      // @ts-ignore
      assert.throws(() => myIntegration.subscribe('Foobar Nonsense', () => {}))
    })
  })

  describe('#handle', () => {
    it('should properly route incoming identify events to the correct handler', async () => {
      const spy = sinon.spy(myIntegration, 'identify')
      await myIntegration.handle({ type: 'identify' })
      assert(spy.calledOnce)
      assert(spy.getCall(0).args[0] instanceof Identify)
    })

    it('should properly route incoming page events to the page handler', async () => {
      const spy = sinon.spy(myIntegration, 'page')
      await myIntegration.handle({ type: 'page' })
      assert(spy.calledOnce)
      assert(spy.getCall(0).args[0] instanceof Page)
    })

    it('should properly route incoming group events to the group handler', async () => {
      const spy = sinon.spy(myIntegration, 'group')
      await myIntegration.handle({ type: 'group' })
      assert(spy.calledOnce)
      assert(spy.getCall(0).args[0] instanceof Group)
    })

    it('should properly route incoming track events to the track handler if the event is not a spec event', async () => {
      const spy = sinon.spy(myIntegration, 'track')
      await myIntegration.handle({ type: 'track', event: 'My Custom Event' })
      assert(spy.calledOnce)
      assert(spy.getCall(0).args[0] instanceof Track)
    })

    it('should properly route subscribed spec events to the correct handler', async () => {
      const stub = sinon.stub()
      myIntegration.subscribe('Order Updated', stub)
      await myIntegration.handle({ type: 'track', event: 'Order Updated' })
      assert(stub.calledOnce)
      assert(stub.getCall(0).args[0] instanceof OrderUpdated)
    })

    it('should route spec events without a subscription to the default track handler', async () => {
      const spy = sinon.spy(myIntegration, 'track')
      await myIntegration.handle({ type: 'track', event: 'Order Updated' })
      assert(spy.calledOnce)
      assert(spy.getCall(0).args[0] instanceof Track)
    })
  })
})
