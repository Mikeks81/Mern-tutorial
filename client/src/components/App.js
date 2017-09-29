import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import * as actions from '../actions'

const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

// to have a component to call an action creator you must use connect, the first arg is fror mapStateToProps ( we dont need app to receive state) and the second is the action that you would like app to be able to call. Then we pass the component into connect as an addtional argument. This will pass the action creator into the components ( App ) props as a function that it can call.
export default connect(null, actions)(App)
