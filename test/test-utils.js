import {getUrl} from '../src/utils'
import {expect} from 'chai'

describe('utils', () => {

  describe('getUrl()', () => {

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

})
