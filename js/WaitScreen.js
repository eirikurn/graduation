import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

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
  }

  constructor(props) {
    super(...arguments)

    this.state = {
      timeLeft: getTimeLeft(props.startTime)
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      timeLeft: getTimeLeft(props.startTime)
    })
  }

  componentDidMount() {
    this.tick()
  }

  tick() {
    this.timer = setTimeout(
      () => {
        const timeLeft = this.state.timeLeft - 1
        this.setState({
          timeLeft,
        })

        if (timeLeft > 0) {
          this.tick()
        }
      },
      1000
    )
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const { timeLeft } = this.state
    const minutes = Math.floor(timeLeft / 60)
    const seconds = Math.floor(timeLeft % 60)

    const displayTime = `${pad(minutes)}:${pad(seconds)}`

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Ahh, þar fór í verra. Nú þarftu bara að bíða smá…</Text>
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
