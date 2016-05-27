import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native'

const Button = ({ children, onPress, style }) => (
  <TouchableHighlight
    underlayColor="#efefef"
    style={[styles.button, style]}
    onPress={onPress}
  >
    <Text style={styles.text}>{children}</Text>
  </TouchableHighlight>
)

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  style: PropTypes.any,
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    height: 88,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
})

export default Button
