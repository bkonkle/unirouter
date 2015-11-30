import chai, {expect} from 'chai'
import jsxChai from 'jsx-chai'
import Link from '../../src/components/link'

chai.use(jsxChai)

describe('<Link/>', () => {

  describe('render()', () => {

    it('renders a link using whatever props are passed to it', () => {
      const context = {props: {'test': 'tested'}}
      const expected = (
        <a href="/gallifrey" onClick="Function" test="tested"></a>
      )

      const result = Link.prototype.render.call(context)

      expect(result).to.deep.equal(expected)
    })

  })

})
