import React, { PropTypes } from 'react'
import {
  StyleSheet,
} from 'react-native'
import Button from './Button'

const AnswerButton = ({ answer, clicked, onPress }) => {
  const correctStyle = clicked && answer.correct && styles.correct
  const incorrectStyle = clicked && !answer.correct && styles.incorrect

  return (
    <Button
      style={[correctStyle, incorrectStyle]}
      onPress={() => onPress(answer)}
    >
      {answer.text}
    </Button>
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
  correct: {
    backgroundColor: 'green',
  },
  incorrect: {
    backgroundColor: 'red',
  },
})

export default AnswerButton
