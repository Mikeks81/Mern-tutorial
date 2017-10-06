import React, { Component } from 'react'

class Banner extends Component {
  jobClassName(jobClass) {
    let jobName = {
      '0': 'Titan',
      '1': 'Hunter',
      '2': 'Warlock'
    }
    return jobName[jobClass]
  }

  render() {
    console.log('PROFILE ', this.props)
    return (
      <div>
        <p>profiles</p>
        <div
          style={{
            background: `url(https://bungie.net${this.props
              .emblemBackgroundPath}) no-repeat left top`,
            height: '100px',
            backgroundSize: 'contain'
          }}
        >
          <p>{this.props.displayName}</p>
          <p>{this.jobClassName(this.props.classType)}</p>
          <p>Level {this.props.baseCharacterLevel}</p>
          <p>{this.props.light}</p>
        </div>

        <img src={`https://bungie.net${this.props.emblemPath}`} />
      </div>
    )
  }
}

export default Banner
