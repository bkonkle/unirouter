import * as actions from '../src/actions'
import chai, {expect} from 'chai'
import reducer, {routeState} from '../src/reducer'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('reducer', () => {

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

  describe('routeState()', () => {

    it('packages the route details up for the state', () => {
      const expected = {
        route: {
          name: undefined,
          options: {'bigger-on-the-inside': 'true'},
        },
        url: '/the/tardis?bigger-on-the-inside=true',
      }

      const result = routeState('/the/tardis?bigger-on-the-inside=true')

      expect(result).to.deep.equal(expected)
    })

  })

  describe('URL_CHANGED', () => {

    it('handles url changed events', () => {
      const action = actions.urlChanged({
        url: '/my/awesome/url?awesome=true',
        source: 'test',
      })
      const expected = routeState('/my/awesome/url?awesome=true')

      const result = reducer({}, action)

      expect(result).to.deep.equal(expected)
    })

  })

  describe('NAVIGATE', () => {

    before(() => {
      global.history = {
        pushState: sinon.spy(),
        replaceState: sinon.spy(),
      }
    })

    afterEach(() => {
      global.history.pushState.reset()
      global.history.replaceState.reset()
    })

    after(() => {
      delete global.history
    })

    it('handles navigate events', () => {
      const action = actions.navigate({url: '/my/awesome/url?awesome=true'})
      const expected = routeState('/my/awesome/url?awesome=true')

      const result = reducer({}, action)

      expect(result).to.deep.equal(expected)
    })

    it('creates a new history entry with pushState', () => {
      const action = actions.navigate({url: '/into/the/tardis'})

      reducer({}, action)

      expect(global.history.pushState).to.have.been.calledWith({}, null, '/into/the/tardis')
      expect(global.history.replaceState).to.not.have.been.called
    })

    it('uses replaceState if silent is true', () => {
      const action = actions.navigate({url: '/into/the/tardis', silent: true})

      reducer({}, action)

      expect(global.history.pushState).to.not.have.been.called
      expect(global.history.replaceState).to.have.been.calledWith({}, null, '/into/the/tardis')
    })

    it('doesn\'t create a new history entry if the user is already on that location', () => {
      const action = actions.navigate({url: '/space/unicorn?lasers=marshmallow'})

      reducer({}, action)

      expect(global.history.pushState).to.not.have.been.called
      expect(global.history.replaceState).to.not.have.been.called
    })

  })

})
