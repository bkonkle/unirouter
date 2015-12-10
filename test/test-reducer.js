import * as actions from '../src/actions'
import {expect} from 'chai'
import reducer, {routeState} from '../src/reducer'

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

  describe('NAVIGATE', () => {

    it('handles navigate events', () => {
      const action = actions.navigate({
        url: '/my/awesome/url?awesome=true',
        source: 'test',
      })
      const expected = routeState('/my/awesome/url?awesome=true')

      const result = reducer({}, action)

      expect(result).to.deep.equal(expected)
    })

  })

})
