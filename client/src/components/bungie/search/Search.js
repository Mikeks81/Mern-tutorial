import React, { Component } from 'react'

class Search extends Component {
  render() {
    return (
      <div className="input-field col s6">
        <input
          placeholder="Placeholder"
          id="first_name"
          type="text"
          className="validate"
        />
        <label for="first_name">First Name</label>
      </div>
    )
  }
}

export default Search
