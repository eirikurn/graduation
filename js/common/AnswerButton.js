import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native'

const AnswerButton = ({ answer, clicked, onPress }) => {
  const correctStyle = clicked && answer.correct && styles.correct
  const incorrectStyle = clicked && !answer.correct && styles.incorrect

  return (
    <TouchableHighlight
      underlayColor="#efefef"
      style={[styles.button, correctStyle, incorrectStyle]}
      onPress={() => onPress(answer)}
    >
      <Text style={styles.text}>{answer.text}</Text>
    </TouchableHighlight>
  )
}

AnswerButton.propTypes = {
  answer: PropTypes.shape({
    text: PropTypes.string,
    correct: PropTypes.bool,
  }),
  onPress: PropTypes.func,
  clicked: PropTypes.bool,
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    height: 88,
    justifyContent: 'center',
  },
  correct: {
    backgroundColor: 'green',
  },
  incorrect: {
    backgroundColor: 'red',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
})

export default AnswerButton
