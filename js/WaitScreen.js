import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native'
import sample from 'lodash/sample'
import { AnimatedCountdownPie } from './common/CountdownPie'
import { failTexts, failImages } from '../config'

const { width: screenWidth } = Dimensions.get('window')

class WaitScreen extends Component {
  static propTypes = {
    waitUntil: PropTypes.number.isRequired,
    totalTime: PropTypes.number.isRequired,
    onFinished: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const timeRemaining = Math.max(0, props.waitUntil - Date.now())
    this.state = {
      timeRemaining,
      progress: new Animated.Value(timeRemaining / props.totalTime),
      failText: sample(failTexts),
      failImage: sample(failImages),
    }
  }

  componentDidMount() {
    this.startCountdown()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  startCountdown() {
    const { progress, timeRemaining } = this.state
    const { onFinished } = this.props
    Animated.timing(progress, {
      toValue: 0,
      duration: timeRemaining,
      easing: Easing.linear,
    }).start(onFinished)
  }

  render() {
    const { failText, failImage, progress } = this.state
    const { totalTime } = this.props

    return (
      <View style={styles.container}>
        <View style={[{ height: screenWidth }]}>
          <Image style={styles.image} source={failImage} />
          <View style={styles.countdown}>
            <AnimatedCountdownPie
              style={styles.countdown}
              size={screenWidth * 0.3}
              progress={progress}
              totalTime={totalTime}
              strokeWidth={5}
              color="white"
              minuteFormat
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.text}>{failText}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  bottom: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#eee',
    fontSize: 38,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  countdown: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.5,
    position: 'absolute',
    padding: 10,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
})

export default WaitScreen
