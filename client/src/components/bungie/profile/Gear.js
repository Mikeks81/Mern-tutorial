import React, { Component } from 'react'

class Gear extends Component {
  constructor() {
    super()
    this.state = {
      gearDetails: []
    }
  }

  theGears() {
    const gearArr = []
    this.props.items.forEach(item => {
      this.props.fetchGearDetails(
        this.props.membershipId,
        item.itemInstanceId,
        res => {
          gearArr.push(res)
          this.setState({
            gearDetails: gearArr
          })
        }
      )
    })
  }

  gearComponent({ data }) {
    return (
      <div key={data.itemDefinition.hash}>
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
    // console.log('GEARR ', this.state)
    return (
      <div>
        <p>item</p>
        <div>
          {this.state.gearDetails.map(item => {
            return this.gearComponent(item)
          })}
        </div>
      </div>
    )
  }
}

export default Gear
