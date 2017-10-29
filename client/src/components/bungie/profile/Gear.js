import React, { Component } from 'react'
import Spinner from '../../../utils/Spinner'
import gManifestJson from '../../../lib/gearManifest.json'
import './Gear.css'

class Gear extends Component {
  constructor(props) {
    super(props)
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
          if (res.data.itemDefinition) {
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
        }
      )
    })
  }

  gearComponent(item, key) {
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
        <div key={key} className="gear-container pre-loader">
          <Spinner key={key} />
        </div>
      )
    }
  }

  componentDidMount() {
    this.theGears()
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.theGears()
    }
  }

  render() {
    return (
      <div className="parent-gear-container">
        <div className="row">
          <div className="col s6 weapons left">
            {this.gearComponent(this.state.mapGear[1498876634], 1)}
            {this.gearComponent(this.state.mapGear[2465295065], 2)}
            {this.gearComponent(this.state.mapGear[953998645], 3)}
          </div>
          <div className="col s6 armor right">
            {this.gearComponent(this.state.mapGear[3448274439], 4)}
            {this.gearComponent(this.state.mapGear[14239492], 5)}
            {this.gearComponent(this.state.mapGear[3551918588], 6)}
            {this.gearComponent(this.state.mapGear[20886954], 7)}
            {this.gearComponent(this.state.mapGear[1585787867], 8)}
          </div>
        </div>
      </div>
    )
  }
}

export default Gear
