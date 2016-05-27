/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { AppRegistry } from 'react-native'
import QuestionScreen from './js/QuestionScreen'
import WaitScreen from './js/WaitScreen'
import { questions } from './config'

const Graduation = () => (
  //<WaitScreen startTime={+new Date() + 60000} />
  <QuestionScreen questions={questions} />
)

AppRegistry.registerComponent('Graduation', () => Graduation)
