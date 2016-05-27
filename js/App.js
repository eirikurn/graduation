import React, { Component } from 'react'
import QuestionScreen from './QuestionScreen'
import WaitScreen from './WaitScreen'
import { questions } from '../config'

class App extends Component {
  state = {
    nextAttempt: null,
    finished: false,
  }

  onFail = failLevel => {
    const nextAttempt = Date.now() + (failLevel + 1) * 60000
    this.setState({
      nextAttempt,
    })
  }

  onFinish = () => {
    this.setState({
      finished: true,
    })
  }

  onWaitFinished = () => {
    this.setState({
      nextAttempt: null,
    })
  }

  renderWait() {
    const { nextAttempt } = this.state
    return (
      <WaitScreen startTime={nextAttempt} onFinished={this.onWaitFinished} />
    )
  }

  render() {
    const { nextAttempt } = this.state
    if (nextAttempt !== null) {
      return this.renderWait()
    }
    return (
      <QuestionScreen
        onFinish={this.onFinish}
        onFail={this.onFail}
        questions={questions}
      />
    )
  }
}

export default App
