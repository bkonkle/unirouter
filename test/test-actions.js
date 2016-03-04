import {NAVIGATE} from '../src/constants'
import {navigate} from '../src/actions'
import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('actions', () => {

  describe('navigate()', () => {

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

    it('creates a NAVIGATE action', () => {
      const payload = {url: '/into/the/tardis', source: 'test'}
      const expected = {type: NAVIGATE, payload}

      const result = navigate(payload)

      expect(result).to.deep.equal(expected)
    })

    it('creates a new history entry with pushState if push is true', () => {
      navigate({
        url: '/into/the/tardis',
        source: 'test',
        push: true,
      })

      expect(global.history.pushState).to.have.been.calledWith({}, null, '/into/the/tardis')
      expect(global.history.replaceState).to.not.have.been.called
    })

    it('uses replaceState if replace is true', () => {
      navigate({
        url: '/into/the/tardis',
        source: 'test',
        replace: true,
      })

      expect(global.history.pushState).to.not.have.been.called
      expect(global.history.replaceState).to.have.been.calledWith({}, null, '/into/the/tardis')
    })

    it('doesn\'t create a new history entry if the user is already on that location', () => {
      navigate({url: '/space/unicorn?lasers=marshmallow'})

      expect(global.history.pushState).to.not.have.been.called
      expect(global.history.replaceState).to.not.have.been.called
    })

    it('uses neither replaceState nor pushState if the source is popState', () => {
      navigate({
        url: '/into/the/tardis',
        source: 'popState',
        replace: true,
      })

      navigate({
        url: '/into/the/tardis',
        source: 'popState',
        push: true,
      })
      expect(global.history.pushState).to.not.have.been.called
      expect(global.history.replaceState).to.not.have.been.called
    })
  })

})
