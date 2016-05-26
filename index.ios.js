/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { AppRegistry } from 'react-native'
import QuestionScreen from './js/QuestionScreen'
import { questions } from './config'

const Graduation = () => (
  <QuestionScreen questions={questions} />
)

AppRegistry.registerComponent('Graduation', () => Graduation)
