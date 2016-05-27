import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import shuffle from 'lodash/shuffle'
import { failTexts } from '../config'

const pad = (number) => {
  let text = number.toString()
  if (text.length === 1) {
    return `0${text}`
  }
  return text
}

const getTimeLeft = (startTime) => {
  return (startTime - new Date()) / 1000
}

class WaitScreen extends Component {
  static propTypes = {
    startTime: PropTypes.number.isRequired,
    onFinished: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(...arguments)

    this.state = {
      timeLeft: getTimeLeft(props.startTime),
      failText: shuffle(failTexts)[0],
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      timeLeft: getTimeLeft(props.startTime)
    })
  }

  componentDidMount() {
    this.countdown()
  }

  countdown() {
    const tick = () => {
      const timeLeft = this.state.timeLeft - 1
      this.setState({ timeLeft })

      if (timeLeft <= 0) {
        this.props.onFinished()
      }
    }

    this.timer = setInterval(tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { timeLeft, failText } = this.state
    const minutes = Math.floor(timeLeft / 60)
    const seconds = Math.floor(timeLeft % 60)

    const displayTime = `${pad(minutes)}:${pad(seconds)}`

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{failText}</Text>
        </View>

        <View>
          <Text style={styles.countdown}>{displayTime}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 38,
    textAlign: 'center',
    marginBottom: 70,
  },
  countdown: {
    fontSize: 60,
  },
})

export default WaitScreen
