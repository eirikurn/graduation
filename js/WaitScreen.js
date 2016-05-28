import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import shuffle from 'lodash/shuffle'
import { failTexts } from '../config'

const pad = (number) => {
  const text = number.toString()
  if (text.length === 1) {
    return `0${text}`
  }
  return text
}

const getTimeLeft = (startTime) =>
  (startTime - new Date()) / 1000

class WaitScreen extends Component {
  static propTypes = {
    waitUntil: PropTypes.number.isRequired,
    onFinished: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      timeLeft: getTimeLeft(props.waitUntil),
      failText: shuffle(failTexts)[0],
    }
  }

  componentDidMount() {
    this.countdown()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  countdown() {
    const tick = () => {
      const timeLeft = Math.max(this.state.timeLeft - 1, 0)
      this.setState({ timeLeft })

      if (timeLeft <= 0) {
        this.props.onFinished()
      }
    }

    this.timer = setInterval(tick, 1000)
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
    backgroundColor: '#E4E4E4',
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
