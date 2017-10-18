import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../../Utils/Spinner'
import ProfileContainer from '../ProfileContainer'
import * as actions from '../../../actions/fetchBungie'

class GroupViewer extends Component {
  componentDidMount() {
    this.props.fetchUserGroup(this.props.match.params.playerName)
  }

  render() {
    if (this.props.bungie) {
      return (
        <div>
          <p>Group</p>
          <p>{this.props.bungie.groupDetails.results[0].group.name}</p>
          <p>
            {this.props.bungie.groupDetails.results[0].group.about} [{
              this.props.bungie.groupDetails.results[0].group.clanInfo
                .clanCallsign
            }]
          </p>
          <div className="row">
            {this.props.bungie.groupMembers.results.map(member => {
              return (
                <ProfileContainer
                  className="col s4"
                  charName={member.destinyUserInfo.displayName}
                  key={member.destinyUserInfo.displayName}
                />
              )
            })}
          </div>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

function mapStateToProps(state) {
  return { bungie: state.bungieGroup }
}

export default connect(mapStateToProps, actions)(GroupViewer)
