import {configureRouter} from '../../src/router'
import {Link} from '../../src/components/link'
import chai, {expect} from 'chai'
import jsxChai from 'jsx-chai'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(jsxChai)
chai.use(sinonChai)

describe('<Link/>', () => {

  describe('render()', () => {

    it('renders a link using whatever props are passed to it', () => {
      const context = {
        props: {href: '/gallifrey', the: 'doctor', children: 'Sonic Screwdriver'},
        handleClick: () => null,
      }
      const expected = (
        <a href="/gallifrey" onClick={() => null} the="doctor">
          Sonic Screwdriver
        </a>
      )

      const result = Link.prototype.render.call(context)

      expect(result).to.deep.equal(expected)
    })

  })

  describe('handleClick()', () => {

    before(() => {
      configureRouter({'sonic-screwdriver': 'GET /sonic/screwdriver'})
    })

    after(() => {
      configureRouter()
    })

    it('navigates to the given route name on click', () => {
      const event = {preventDefault: sinon.spy()}
      const context = {
        props: {name: 'sonic-screwdriver', navigate: sinon.spy()},
      }

      Link.prototype.handleClick.call(context, event)

      expect(event.preventDefault).to.have.been.called
      expect(context.props.navigate).to.have.been.calledWith('/sonic/screwdriver')
    })

  })

})
