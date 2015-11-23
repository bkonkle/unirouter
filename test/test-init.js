import {getUrl, handlePopState} from '../src/init'
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
