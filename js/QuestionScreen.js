import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Button from './common/AnswerButton'
import LinearGradient from 'react-native-linear-gradient'

class QuestionScreen extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View />
          <Text>Spurning</Text>
          <Text>1 af 10</Text>
        </View>

        <LinearGradient style={styles.question} colors={['#FFFFFF', '#E4E4E4']}>
          <Text style={styles.questionText}>
            Hvað er Berglind með mikinn pening í veskinu sínu?
          </Text>
        </LinearGradient>

        <View style={styles.answerContainer}>
          <Button>Answer</Button>
          <Button>Answer</Button>
          <Button>Answer</Button>
          <Button>Answer</Button>
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
    height: 44,
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
