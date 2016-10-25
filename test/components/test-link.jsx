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
  before(() => {
    configureRouter({
      'doctor-who': 'GET /the-doctor',
      'sonic-screwdriver': 'GET /sonic/screwdriver',
    })
  })

  after(() => {
    configureRouter()
  })

  describe('render()', () => {
    it('renders a link using whatever props are passed to it', () => {
      const context = {
        props: {href: '/gallifrey', name: 'doctor-who', the: 'doctor', children: 'Sonic Screwdriver'},
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

    it('uses the url as the href when no href is provided', () => {
      const context = {
        props: {name: 'sonic-screwdriver'},
        handleClick: () => null,
      }
      const expected = (
        <a href="/sonic/screwdriver" onClick={() => null} />
      )

      const result = Link.prototype.render.call(context)

      expect(result).to.deep.equal(expected)
    })
  })

  describe('handleClick()', () => {
    it('navigates to the given url on click', () => {
      const event = {preventDefault: sinon.spy()}
      const context = {props: {navigate: sinon.spy()}}

      Link.prototype.handleClick.call(context, event, '/sonic/screwdriver')

      expect(event.preventDefault).to.have.been.called
      expect(context.props.navigate).to.have.been.calledWith({url: '/sonic/screwdriver', push: true})
    })
  })
})
