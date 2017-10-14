import React, { Component } from 'react'
import Spinner from '../../Utils/Spinner'
import gManifestJson from '../../../lib/gearManifest.json'
import './Gear.css'

class Gear extends Component {
  constructor() {
    super()
    this.state = {
      mapGear: {}
    }
  }

  theGears() {
    let newMapState = {}
    this.props.items.forEach(item => {
      this.props.fetchGearDetails(
        this.props.membershipId,
        item.itemInstanceId,
        res => {
          const {
            equipmentSlotTypeHash
          } = res.data.itemDefinition.equippingBlock

          if (gManifestJson[equipmentSlotTypeHash]) {
            newMapState[equipmentSlotTypeHash] = { value: res.data }
          }

          this.setState({
            mapGear: newMapState
          })
        }
      )
    })
  }

  gearComponent(item) {
    if (item && item.value) {
      const { value } = item
      return (
        <div className="gear-container" key={value.itemDefinition.hash}>
          <img
            src={`http://bungie.net/${value.itemDefinition.displayProperties
              .icon}`}
          />
          <div className="gear-details">
            <p>{value.itemDefinition.displayProperties.name}</p>
            <p>{value.itemDefinition.itemTypeDisplayName}</p>
            <p>
              {value.itemFetch.instance.data.primaryStat &&
                value.itemFetch.instance.data.primaryStat.value}
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="gear-container pre-loader">
          <Spinner />
        </div>
      )
    }
  }

  componentDidMount() {
    this.theGears()
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6 weapons left">
            {this.gearComponent(this.state.mapGear[1498876634])}
            {this.gearComponent(this.state.mapGear[2465295065])}
            {this.gearComponent(this.state.mapGear[953998645])}
          </div>
          <div className="col s6 armor right">
            {this.gearComponent(this.state.mapGear[3448274439])}
            {this.gearComponent(this.state.mapGear[14239492])}
            {this.gearComponent(this.state.mapGear[3551918588])}
            {this.gearComponent(this.state.mapGear[20886954])}
            {this.gearComponent(this.state.mapGear[1585787867])}
          </div>
        </div>
      </div>
    )
  }
}

export default Gear
