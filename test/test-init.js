import chai, {expect} from 'chai'
import proxyquire from 'proxyquire'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

const configureSpy = sinon.spy()

const init = proxyquire('../src/init', {
  './router': {configureRouter: configureSpy},
})

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

  afterEach(() => {
    configureSpy.reset()
  })

  describe('handlePopState()', () => {
    const state = {router: {}}
    const store = {dispatch: sinon.spy(), getState: () => state}

    it('dispatches a navigate event', () => {
      const expected = {
        payload: {
          url: '/space/unicorn?lasers=marshmallow',
          source: 'popState',
          push: true,
        },
        type: 'NAVIGATE',
      }

      init.handlePopState(store)({})

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

    it('configures the router with the provided routes and aliases', () => {
      init.default(store, routes, aliases)

      expect(configureSpy).to.have.been.calledWith(routes, aliases)
    })

    it('dispatches a navigate event', () => {
      const expected = {
        payload: {
          url: '/space/unicorn?lasers=marshmallow',
          source: 'init',
        },
        type: 'NAVIGATE',
      }

      init.default(store, routes, aliases)

      expect(store.dispatch).to.have.been.calledWith(expected)
    })

    it('attaches an event handler to window.onpopstate', () => {
      init.default(store, routes, aliases)
      expect(window).to.have.property('onpopstate').and.be.a('function')
    })

    it('works universally when no window is present', () => {
      const origWindow = global.window
      delete global.window

      init.default(store, routes, aliases)

      expect(configureSpy).to.have.been.calledWith(routes, aliases)

      global.window = origWindow
    })

  })

})
