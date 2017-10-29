import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/fetchBungie'
import Profile from './profile/Banner'
import Gear from './profile/Gear'
import Search from './search/Search'
import { TweenLite, Power3 } from 'gsap'
import './ProfileContainer.css'

class ProfileContainer extends Component {
  constructor() {
    super()
    this.isSlide = 0
    this.state = {
      bungieProfile: ''
    }
  }

  async fetchPlayer(playerName) {
    const res = await this.props.fetchPlayer(playerName)
    this.setState({
      bungieProfile: res
    })
  }

  componentDidMount() {
    if (this.props.charName) this.fetchPlayer(this.props.charName)
  }

  navLeft() {
    if (this.isSlide <= 0) return
    const { profileCarousel } = this.refs
    TweenLite.to(profileCarousel, 0.5, {
      xPercent: '+=33.33',
      ease: Power3.easeIn,
      onComplete: () => {
        this.isSlide -= 1
      }
    })
  }

  navRight() {
    if (this.isSlide >= 2) return
    const { profileCarousel } = this.refs
    TweenLite.to(profileCarousel, 0.5, {
      xPercent: '-=33.33',
      ease: Power3.easeIn,
      onComplete: () => {
        this.isSlide += 1
      }
    })
  }

  profileNav() {
    return (
      <div className="profile-nav">
        <i
          className="small material-icons left"
          onClick={this.navLeft.bind(this)}
        >
          chevron_left
        </i>
        <i
          className="small material-icons right"
          onClick={this.navRight.bind(this)}
        >
          chevron_right
        </i>
      </div>
    )
  }

  renderProfiles() {
    return this.state.bungieProfile.Response.profile.data.characterIds.map(
      (cId, i) => {
        const profile = {
          ...this.state.bungieProfile.Response.characters.data[cId],
          ...this.state.bungieProfile.Response.profile.data.userInfo,
          ...this.state.bungieProfile.Response.characterEquipment.data[cId]
        }
        const gearProps = {
          items: profile.items,
          membershipId: profile.membershipId,
          characterId: profile.characterId
        }
        return (
          <div className="profile-content col s4" key={i}>
            <div className="card-panel">
              <Profile {...profile} />
              <Gear
                {...gearProps}
                fetchGearDetails={this.props.fetchGearDetails}
              />
            </div>
          </div>
        )
      }
    )
  }

  render() {
    return (
      <div className={this.props.className}>
        {!this.props.charName && (
          <Search fetchPlayer={this.fetchPlayer.bind(this)} />
        )}
        <div className={`profile-container ${this.props.charName}`}>
          {this.profileNav()}
          <div className="profile-carousel row" ref="profileCarousel">
            {this.state.bungieProfile && this.renderProfiles()}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(ProfileContainer)
