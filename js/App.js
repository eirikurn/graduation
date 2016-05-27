import React, { Component } from 'react'
import QuestionScreen from './QuestionScreen'
import WaitScreen from './WaitScreen'
import { questions, waitTime } from '../config'
import { loadAttempt, saveAttempt } from './state'

class App extends Component {
  state = {
    loading: true,
    nextAttempt: null,
    finished: false,
  }

  componentDidMount() {
    this.loadState()
  }

  onFail = async failLevel => {
    const nextAttempt = Date.now() + (failLevel + 1) * waitTime * 1000
    this.setState({
      nextAttempt,
    })

    saveAttempt(nextAttempt)
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

    saveAttempt(null)
  }

  async loadState() {
    const nextAttempt = await loadAttempt()

    this.setState({
      loading: false,
      nextAttempt,
    })
    if (nextAttempt < Date.now()) {
      this.onWaitFinished()
    }
  }

  renderWait() {
    const { nextAttempt } = this.state
    return (
      <WaitScreen startTime={nextAttempt} onFinished={this.onWaitFinished} />
    )
  }

  render() {
    const { nextAttempt, loading } = this.state
    if (loading) {
      return null
    }
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
