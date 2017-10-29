import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Spinner extends Component {
  constructor() {
    super()
    this.spinnerTimeout = ''
    this.state = {
      hide: false
    }
  }

  componentDidMount() {
    this.setSpinnerTimeout()
  }

  componentDidUpdate() {
    this.setSpinnerTimeout()
  }

  componentWillUnMount() {
    console.log('unmount')
    clearInterval(this.spinnerTimeout)
  }

  setSpinnerTimeout() {
    clearInterval(this.spinnerTimeout)
    this.spinnerTimeout = setTimeout(() => {
      this.setState({ hide: true })
    }, 10000)
  }

  render() {
    if (this.state.hide) return null
    return (
      <div
        className={`preloader-wrapper small active ${this.props.className}`}
        ref="spinner"
      >
        <div className="spinner-layer spinner-blue">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>

        <div className="spinner-layer spinner-red">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>

        <div className="spinner-layer spinner-yellow">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>

        <div className="spinner-layer spinner-green">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    )
  }
}

export default Spinner
