import React, { PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import Button from './common/Button'

const VictoryScreen = ({ onRestart }) => (
  <View style={styles.container}>
    <Text style={styles.heading}>GAME OVER</Text>
    <Text style={styles.text}>Til hamingju! Þú svaraðir öllum spurningum rétt.</Text>
    <Text style={styles.text}>
      Í útskriftargjöf færð þú aðgang að Apple Developer Program.
      Þá getur þú búið til iOS forrit, gefið út og grætt milljónir.
    </Text>
    <Text style={styles.credit}>
      Eiríkur Berglind Alexander Andrea Ægir Waleska Elisabeth Perla
    </Text>
    <Button onPress={onRestart}>Spila aftur</Button>
  </View>
)

VictoryScreen.propTypes = {
  onRestart: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  credit: {
    color: '#999',
    fontSize: 14,
    marginBottom: 20,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
})

export default VictoryScreen
