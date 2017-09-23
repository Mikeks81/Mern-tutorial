import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {
  renderContent() {
    const { auth } = this.props
    switch (auth) {
      case null:
        return
      case false:
        return (
          <li>
            <a href="/auth/google">Log in with Google</a>
          </li>
        )
      default:
        return (
          <li>
            <a href="/api/logout">Log out</a>
          </li>
        )
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>

          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header)
