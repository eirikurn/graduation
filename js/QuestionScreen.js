import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import AnswerButton from './common/AnswerButton'
import LinearGradient from 'react-native-linear-gradient'
import shuffle from 'lodash/shuffle'
import delay from './utility/delay'

class QuestionScreen extends Component {
  static propTypes = {
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(
          PropTypes.string
        ),
      })
    ).isRequired,
    onFail: PropTypes.func,
    onFinish: PropTypes.func,
  }

  state = this.getStateForQuestion(0)

  onPressAnswer = async (answer) => {
    this.setState({
      pressedAnswer: answer,
    })

    await delay(1000)

    this.nextQuestion()
  }

  getStateForQuestion(questionIndex) {
    const { questions } = this.props
    const { question, answers } = questions[questionIndex]
    const answerObjects = answers.map((answer, answerIndex) => ({
      text: answer,
      correct: answerIndex === 0,
    }))
    return {
      index: questionIndex,
      currentQuestion: {
        question,
        answers: shuffle(answerObjects),
        correctAnswer: answerObjects[0],
      },
      pressedAnswer: null,
    }
  }

  nextQuestion() {
    const { questions, onFail, onFinish } = this.props
    const { index, pressedAnswer } = this.state
    const nextIndex = index + 1
    const isFinished = nextIndex >= questions.length

    // Incorrect answer. FAIL!
    if (!pressedAnswer.correct) {
      onFail(index)
      return
    }

    // Finished. Show game over.
    if (isFinished) {
      onFinish()
      return
    }

    // Not finished. Show next level.
    this.setState(this.getStateForQuestion(nextIndex))
  }

  render() {
    const {
      currentQuestion: {
        question,
        answers,
      },
      pressedAnswer,
      index,
    } = this.state
    const { questions } = this.props

    const levelText = `${index + 1} af ${questions.length}`

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Spurning</Text>
          <Text style={styles.headerText}>10</Text>
          <Text style={styles.headerText}>{levelText}</Text>
        </View>

        <LinearGradient style={styles.question} colors={['#FFFFFF', '#E4E4E4']}>
          <Text style={styles.questionText}>{question}</Text>
        </LinearGradient>

        <View style={styles.answerContainer}>
          {answers.map(answer => (
            <AnswerButton
              answer={answer}
              onPress={this.onPressAnswer}
              clicked={pressedAnswer === answer}
              key={answer.text}
            />
          ))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 8,
    height: 44,
  },
  headerTitle: {
    fontSize: 17,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 12,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 17,
  },
  question: {
    height: 190,
    justifyContent: 'center',
    padding: 10,
  },
  questionText: {
    backgroundColor: 'transparent',
    fontSize: 38,
    textAlign: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  answerContainer: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
})

export default QuestionScreen
