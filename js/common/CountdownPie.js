import React, { PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import {
  Surface,
  Group,
  Shape,
  Path as createPath,
} from 'ReactNativeART'

const CountdownPie = class extends React.Component {
  render() {
    const { size, stroke, totalTime, strokeWidth, progress } = this.props
    const radius = size / 2 - strokeWidth / 2
    const path = (
      createPath().moveTo(0, -radius)
        .arc(0, radius * 2, radius)
        .arc(0, radius * -2, radius)
    )
    const text = Math.floor(totalTime * progress)
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Surface style={styles.surface} width={size} height={size}>
          <Group x={size / 2} y={size / 2}>
            <Shape
              d={path}
              stroke={stroke}
              strokeCap="butt"
              strokeWidth={strokeWidth}
              strokeDash={[radius * 2 * Math.PI * progress, 700]}
            />
          </Group>
        </Surface>
        <Text style={[{ fontSize: size / 2 }]}>{text}</Text>
      </View>
    )
  }
}

CountdownPie.propTypes = {
  size: PropTypes.number.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  progress: PropTypes.number,
  totalTime: PropTypes.number.isRequired,
}

CountdownPie.defaultProps = {
  progress: 1,
  strokeWidth: 2,
  stroke: 'black',
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
})

export default CountdownPie
