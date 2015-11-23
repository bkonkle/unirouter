import {getUrl, handleUnload, handlePopState} from '../src/init'
import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('init', () => {

  describe('getUrl()', () => {

    it('pulls the url from window.location', () => {
      global.window = {
        location: {
          pathname: '/space/unicorn',
          search: '?lasers=marshmallow',
        },
      }

      const result = getUrl()

      expect(result).to.equal('/space/unicorn?lasers=marshmallow')
    })

    it('pulls the url from the state if this is a universal app', () => {
      const store = {
        getState: () => ({router: {url: '/space/unicorn?rainbows=delivered'}}),
      }

      const result = getUrl(true, store)

      expect(result).to.equal('/space/unicorn?rainbows=delivered')
    })

  })

  describe('handleUnload()', () => {

    const message = 'don\'t go!'

    const store = {
      getState: () => ({
        router: {
          preventNavigation: true, preventNavigationMessage: message,
        },
      }),
    }

    it('returns a message to use in the browser-standard confirmation dialog', () => {
      const result = handleUnload(store, {})
      expect(result).to.equal(message)
    })

    it('sets the message as the return value of the event for cross-browser compat', () => {
      const event = {}
      handleUnload(store, event)
      expect(event.returnValue).to.equal(message)
    })

    it('does nothing if preventNavigation is false', () => {
      const event = {}
      const noPreventStore = {
        getState: () => ({router: {preventNavigation: false}}),
      }

      const result = handleUnload(noPreventStore, event)

      expect(result).to.be.empty
      expect(event.returnValue).to.be.undefined
    })

    it('does nothing if no message is set', () => {
      const event = {}
      const noPreventStore = {
        getState: () => ({router: {preventNavigation: true}}),
      }

      const result = handleUnload(noPreventStore, event)

      expect(result).to.be.empty
      expect(event.returnValue).to.be.undefined
    })

  })

  describe('handlePopState()', () => {
    const state = {router: {}}
    const store = {dispatch: sinon.spy(), getState: () => state}

    it('dispatches a URL_CHANGED event', () => {
      const expected = {
        payload: {source: 'popState', url: '/space/unicorn?lasers=marshmallow'},
        type: 'URL_CHANGED',
      }

      handlePopState(store, {})

      expect(store.dispatch).to.have.been.calledWith(expected)
    })

  })

})
