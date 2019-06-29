import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Portal extends Component {
  render () {
    return (
      <div>
        Portal {this.props.match.params.portal}
        <div>
          <Link to={`/portal/${this.props.match.params.portal}/1`}>{this.props.match.params.portal} 1</Link>
        </div>
      </div>
    )
  }
}

export default Portal;
