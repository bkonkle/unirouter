import {connect} from 'react-redux'
import * as actions from '../actions'
import React, {PropTypes} from 'react'
import router from '../router'

class Link extends React.Component {

  static propTypes = {
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.object,
  }

  handleClick(event) {
    event.preventDefault()
    const url = router.generate(this.props.name, this.props.options)
    this.props.navigate(url)
  }

  render() {
    const {href, name, options, ...rest} = this.props
    return (
      <a href={href} onClick={this.handleClick} {...rest}>
        {this.props.children}
      </a>
    )
  }

}

export default connect(() => ({}), actions)(Link)
