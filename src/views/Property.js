import React, { Component } from 'react'

class Property extends Component {
  render () {
    return (
      <div>
        Property {this.props.match.params.id} {this.props.match.params.portal}
      </div>
    )
  }
}

export default Property;
