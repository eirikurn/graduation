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
    const totalTime = (failLevel + 1) * waitTime
    const waitUntil = Date.now() + totalTime

    this.refs.navigator.push({ waitUntil, totalTime })
    saveAttempt({ waitUntil, totalTime })
  }

  onFinish = () => {
    this.refs.navigator.push({ finished: true })
  }

  reset = () => {
    this.refs.navigator.pop()
  }

  async loadState() {
    const { waitUntil, totalTime } = await loadAttempt()

    const initialStack = [
      { questions },
    ]
    if (waitUntil != null && waitUntil >= Date.now()) {
      initialStack.push({ waitUntil, totalTime })
    }

    this.setState({
      initialStack,
    })
  }

  renderScene = (route, navigator) => {
    if (route.waitUntil) {
      return <WaitScreen {...route} onFinished={this.reset} />
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
