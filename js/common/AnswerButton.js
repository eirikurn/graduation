import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native'

const AnswerButton = ({ children }) => (
  <TouchableHighlight style={styles.button}>
    <Text style={styles.text}>{children}</Text>
  </TouchableHighlight>
)

AnswerButton.propTypes = {
  children: PropTypes.node,
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    height: 88,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
})

export default AnswerButton
