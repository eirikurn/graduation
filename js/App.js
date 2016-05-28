import React, { Component } from 'react'
import {
  StyleSheet,
  Navigator,
} from 'react-native'
import QuestionScreen from './QuestionScreen'
import WaitScreen from './WaitScreen'
import VictoryScreen from './VictoryScreen'
import { questions, waitTime } from '../config'
import { loadAttempt, saveAttempt } from './state'

class App extends Component {
  state = {
    initialStack: null,
  }

  componentDidMount() {
    this.loadState()
  }

  onFail = async failLevel => {
    const nextAttempt = Date.now() + (failLevel + 1) * waitTime * 1000

    this.refs.navigator.push({ waitUntil: nextAttempt })
    saveAttempt(nextAttempt)
  }

  onFinish = () => {
    this.refs.navigator.push({ finished: true })
  }

  reset = () => {
    this.refs.navigator.pop()
  }

  async loadState() {
    const nextAttempt = await loadAttempt()

    const initialStack = [
      { questions },
    ]
    if (nextAttempt != null && nextAttempt >= Date.now()) {
      initialStack.push({ waitUntil: nextAttempt })
    }

    this.setState({
      initialStack,
    })
  }

  renderScene = (route, navigator) => {
    if (route.waitUntil) {
      return <WaitScreen waitUntil={route.waitUntil} onFinished={this.reset} />
    }
    if (route.finished) {
      return <VictoryScreen onRestart={this.reset} />
    }
    return (
      <QuestionScreen
        navigator={navigator}
        onFinish={this.onFinish}
        onFail={this.onFail}
        questions={questions}
      />
    )
  }

  render() {
    const { initialStack } = this.state
    if (!initialStack) {
      return null
    }

    return (
      <Navigator
        ref="navigator"
        navigationBar={false}
        style={styles.container}
        configureScene={() => Navigator.SceneConfigs.FloatFromBottom}
        initialRouteStack={initialStack}
        renderScene={this.renderScene}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
