import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/fetchBungie'
import Profile from './profile/Banner'
import Gear from './profile/Gear'

class ProfileContainer extends Component {
  componentDidMount() {
    console.log(this.props, actions)
    this.props.fetchPlayer('DirtiSausage')
  }

  renderProfiles() {
    return this.props.bungieProfile.Response.profile.data.characterIds.map(
      (cId, i) => {
        const profile = {
          ...this.props.bungieProfile.Response.characters.data[cId],
          ...this.props.bungieProfile.Response.profile.data.userInfo,
          ...this.props.bungieProfile.Response.characterEquipment.data[cId]
        }
        const gearProps = {
          items: profile.items,
          membershipId: profile.membershipId,
          characterId: profile.characterId
        }
        return (
          <div key={i}>
            <Profile {...profile} />
            <Gear
              {...gearProps}
              fetchGearDetails={this.props.fetchGearDetails}
            />
          </div>
        )
      }
    )
  }

  render() {
    return (
      <div>
        <p>asdfasd</p>
        {this.props.bungieProfile && this.renderProfiles()}
      </div>
    )
  }
}

function mapStateToProps({ bungie }) {
  return {
    bungieProfile: bungie
  }
}

export default connect(mapStateToProps, actions)(ProfileContainer)
