import React, { Component } from 'react'
import './Banner.css'

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
    return (
      <div>
        <div
          className="banner-container"
          style={{
            background: `url(https://bungie.net${this.props
              .emblemBackgroundPath}) no-repeat left center`,
            backgroundSize: 'cover'
          }}
        >
          <div className="banner-content">
            <p>
              {this.props.displayName}
              <span> {this.jobClassName(this.props.classType)}</span>
            </p>
            <p>
              Level {this.props.baseCharacterLevel} // {this.props.light}
            </p>
            <p />
          </div>
        </div>
      </div>
    )
  }
}

export default Banner
