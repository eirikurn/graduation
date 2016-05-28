import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native'
import { AnimatedCountdownPie } from './common/CountdownPie'
import AnswerButton from './common/AnswerButton'
import LinearGradient from 'react-native-linear-gradient'
import shuffle from 'lodash/shuffle'
import delay from './utility/delay'
import { questionTime } from '../config'

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
    navigator: PropTypes.object,
    onFail: PropTypes.func,
    onFinish: PropTypes.func,
  }

  state = this.getStateForQuestion(0)

  componentDidMount() {
    const { navigationContext } = this.props.navigator

    this.listeners.push(
      navigationContext.addListener('willfocus', this.onWillFocus)
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { timeLeft } = this.state
    if (timeLeft && timeLeft !== prevState.timeLeft) {
      this.startCountdown()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.listeners.forEach(listener => listener.remove())
  }

  onWillFocus = event => {
    if (event.data.route.questions) {
      this.setState(this.getStateForQuestion(0))
    }
  }

  onPressAnswer = async (answer) => {
    this.setState({
      pressedAnswer: answer,
    })

    const { timeLeft } = this.state
    if (timeLeft) {
      timeLeft.stopAnimation()
    }

    await delay(1000)

    this.nextQuestion()
  }

  onFail = () => {
    this.props.onFail(this.state.index)
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
      timeLeft: questionIndex > 0 && new Animated.Value(1),
    }
  }

  listeners = []

  startCountdown() {
    const { timeLeft } = this.state
    this.animation = Animated.timing(timeLeft, {
      toValue: 0,
      duration: questionTime,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        this.onFail()
      }
    })
  }

  nextQuestion() {
    const { questions, onFinish } = this.props
    const { index, pressedAnswer } = this.state
    const nextIndex = index + 1
    const isFinished = nextIndex >= questions.length

    // Incorrect answer. FAIL!
    if (!pressedAnswer.correct) {
      this.onFail()
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

  get timerVisible() {
    return this.state.index !== 0
  }

  render() {
    const {
      currentQuestion: {
        question,
        answers,
      },
      pressedAnswer,
      index,
      timeLeft,
    } = this.state
    const { questions } = this.props

    const levelText = `${index + 1} af ${questions.length}`

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Spurning</Text>
          <View>
            {this.timerVisible &&
              <AnimatedCountdownPie
                size={24}
                totalTime={questionTime}
                progress={timeLeft}
              />
            }
          </View>
          <Text style={styles.headerText}>{levelText}</Text>
        </View>

        <LinearGradient style={styles.question} colors={['#FFFFFF', '#E4E4E4']}>
          <Text style={styles.questionText}>{question}</Text>
        </LinearGradient>

        <View style={styles.answerContainer}>
          {answers.map(answer => (
            <AnswerButton
              answer={answer}
              disabled={!!pressedAnswer}
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
    height: 220,
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
