import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import proxyquire from 'proxyquire'

chai.use(sinonChai)

const unilocSpy = sinon.spy()

const router = proxyquire('../src/router', {
  'uniloc': unilocSpy,
})

describe('router', () => {

  afterEach(() => {
    unilocSpy.reset()
  })

  describe('configureRouter()', () => {

    it('refreshes the router instance with new routes and aliases', () => {
      const routes = []
      const aliases = {}

      router.configureRouter(routes, aliases)

      expect(unilocSpy).to.have.been.calledWith(routes, aliases)
    })

  })

})
