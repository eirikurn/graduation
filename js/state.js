import {
  AsyncStorage,
} from 'react-native'

const ATTEMPT_KEY = 'ATTEMPT_STATE'

export const saveAttempt = (attempt) =>
  AsyncStorage.setItem(ATTEMPT_KEY, JSON.stringify(attempt)).done()

export const loadAttempt = async () => {
  const nextAttemptRaw = await AsyncStorage.getItem(ATTEMPT_KEY)
  return JSON.parse(nextAttemptRaw || '{}')
}
