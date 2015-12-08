import {connect} from 'react-redux'
import * as actions from '../actions'
import React, {PropTypes} from 'react'
import getRouter from '../router'

export class Link extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    name: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    options: PropTypes.object,
  }

  handleClick(event, url) {
    event.preventDefault()
    this.props.navigate({url, push: true})
  }

  render() {
    const {href, name, options, ...rest} = this.props
    const url = getRouter().generate(name, options)

    return (
      <a href={href || url} onClick={(event) => this.handleClick(event, url)} {...rest}>
        {this.props.children}
      </a>
    )
  }

}

export default connect(() => ({}), actions)(Link)
