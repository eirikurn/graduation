import React, { PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import Button from './common/Button'

const VictoryScreen = ({ onRestart }) => (
  <View style={styles.container}>
    <Text style={styles.heading}>LEIK LOKIÐ</Text>

    <Text style={styles.text}>
      Í útskriftargjöf færð þú aðgang að Apple Developer Program.
      Einnig færðu aðgang að kóðanum fyrir þessu MAGNAÐA forriti.
    </Text>
    <Text style={styles.code}>
      Login: birkir-dev@nilsson.is
    </Text>
    <Text style={styles.code}>
      Password: Utskrift2016
    </Text>
    <Text style={styles.text}>
      Nú getur þú búið til iOS apps, sett í App Store og grætt milljónir.
      Við fáum auðvitað 50% af öllum hagnaði.
    </Text>
    <Text style={styles.credit}>
      Eiríkur, Berglind, Alexander, Andrea, Ægir, Waleska, Elisabeth, Perla
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
    padding: 16,
  },
  heading: {
    fontSize: 60,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  code: {
    textAlign: 'center',
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
