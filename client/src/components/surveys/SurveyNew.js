import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends Component {
  state = { showReview: false }

  renderContent() {
    if (this.state.showReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showReview: false })}
        />
      )
    }
    return (
      <SurveyForm onSurveySubmit={() => this.setState({ showReview: true })} />
    )
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

// clears surveyForm on survey new mount or unmount
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew)
