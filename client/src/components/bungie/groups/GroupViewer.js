import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions/fetchBungie'

class GroupViewer extends Component {
  componentDidMount() {
    this.props.fetchUserGroup(this.props.match.params.playerName)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <p>Group</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { bungie: state.bungie }
}

export default connect(mapStateToProps, actions)(GroupViewer)
