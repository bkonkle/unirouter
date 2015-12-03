import {getUrl} from '../src/utils'
import {expect} from 'chai'

describe('utils', () => {

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

      delete global.window
    })

    it('pulls the url from the state if this is a universal app', () => {
      const store = {
        getState: () => ({router: {url: '/space/unicorn?rainbows=delivered'}}),
      }

      const result = getUrl(store)

      expect(result).to.equal('/space/unicorn?rainbows=delivered')
    })

  })

})
