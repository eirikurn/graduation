import {
  AsyncStorage,
} from 'react-native'

const ATTEMPT_KEY = 'ATTEMPT'

export const saveAttempt = (nextAttempt) =>
  AsyncStorage.setItem(ATTEMPT_KEY, JSON.stringify(nextAttempt)).done()

export const loadAttempt = async () => {
  const nextAttemptRaw = await AsyncStorage.getItem(ATTEMPT_KEY)
  return JSON.parse(nextAttemptRaw || 'null')
}
