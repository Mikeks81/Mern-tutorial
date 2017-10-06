import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions/fetchBungie'

class Gear extends Component {
  constructor() {
    super()
    this.state = {
      gearDetails: []
    }
  }

  theGears() {
    const arr = this.props.items.map(async item => {
      console.log(item)
      return await this.props.fetchGearDetails(
        this.props.membershipId,
        item.itemInstanceId
      )
    })
    Promise.all(arr).then(arr => {
      this.setState(prevState => ({
        gearDetails: [...prevState.gearDetails, ...arr]
      }))
    })
  }

  gearComponent({ data }) {
    return (
      <div>
        <p>{data.itemDefinition.displayProperties.name}</p>
        <img
          src={`http://bungie.net/${data.itemDefinition.displayProperties
            .icon}`}
        />
      </div>
    )
  }

  componentDidMount() {
    this.theGears()
  }

  render() {
    console.log('GEARR ', this.state)
    return (
      <div>
        <p>item</p>
        <div>
          {this.state.gearDetails.map(item => {
            console.log('running!!', item)
            return this.gearComponent(item)
          })}
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(Gear)
