import React, { Component } from 'react'

class Search extends Component {
  constructor() {
    super()
    this.state = { value: '' }
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.value)
    this.props.fetchPlayer(this.state.value)
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-field col s12">
            <input
              placeholder="Search Gaurdians"
              id="guardian-search"
              type="text"
              className="validate"
              name="guardian-search"
              onChange={this.handleChange.bind(this)}
              value={this.state.value}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default Search
