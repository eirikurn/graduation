import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native'
import {
  Surface,
  Group,
  Shape,
  Path as createPath,
} from 'ReactNativeART'

class CountdownPie extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
    progress: PropTypes.number,
    totalTime: PropTypes.number.isRequired,
    minuteFormat: PropTypes.bool,
  }

  static defaultProps = {
    progress: 1,
    strokeWidth: 2,
    color: 'black',
    minuteFormat: false,
  }

  getFontSize() {
    const { size, minuteFormat } = this.props
    return minuteFormat ? size * 0.2 : size * 0.5
  }

  getText() {
    const { totalTime, progress, minuteFormat } = this.props
    const secondsRemaining = totalTime * progress / 1000
    if (minuteFormat) {
      const minutes = Math.floor(secondsRemaining / 60)
      const seconds = Math.floor(secondsRemaining % 60)
      return `${pad(minutes)}:${pad(seconds)}`
    }

    return Math.floor(secondsRemaining)
  }

  render() {
    const {
      size,
      color,
      strokeWidth,
      progress,
    } = this.props
    const radius = size / 2 - strokeWidth / 2
    const path = (
      createPath().moveTo(0, -radius)
        .arc(0, radius * 2, radius)
        .arc(0, radius * -2, radius)
    )


    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Surface style={styles.surface} width={size} height={size}>
          <Group x={size / 2} y={size / 2}>
            <Shape
              d={path}
              strokeColor="red"
              stroke={color}
              strokeCap="butt"
              strokeWidth={strokeWidth}
              strokeDash={[radius * 2 * Math.PI * progress, radius * 2 * Math.PI]}
            />
          </Group>
        </Surface>
        <Text style={[{ color, fontSize: this.getFontSize() }]}>
          {this.getText()}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
})


const pad = (number) => {
  const text = number.toString()
  if (text.length === 1) {
    return `0${text}`
  }
  return text
}

export default CountdownPie
export const AnimatedCountdownPie = Animated.createAnimatedComponent(CountdownPie)
