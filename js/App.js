import React, { Component } from 'react'
import QuestionScreen from './QuestionScreen'
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

  render() {
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
