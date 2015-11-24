import init, {getUrl, handlePopState} from '../src/init'
import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('init', () => {

  before(() => {
    global.window = {
      location: {
        pathname: '/space/unicorn',
        search: '?lasers=marshmallow',
      },
    }
  })

  after(() => {
    delete global.window
  })

  describe('getUrl()', () => {

    it('pulls the url from window.location', () => {
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

  describe('init()', () => {

    const state = {router: {}}
    const store = {dispatch: sinon.spy(), getState: () => state}

    const routes = {
      all: 'GET /all',
      around: 'POST /around',
      the: 'GET /the/:id',
      world: 'POST /world',
    }

    const aliases = {
      'POST /globe': 'world',
    }

    afterEach(() => {
      delete window.onpopstate
    })

    it('dispatches an initRouter event', () => {
      const expected = {
        payload: {url: '/space/unicorn?lasers=marshmallow', routes, aliases},
        type: 'INIT_ROUTER',
      }

      init(store, routes, aliases)

      expect(store.dispatch).to.have.been.calledWith(expected)
    })

    it('attaches an event handler to window.onpopstate', () => {
      init(store, routes, aliases)
      expect(window).to.have.property('onpopstate').and.equal(handlePopState)
    })

  })

})
