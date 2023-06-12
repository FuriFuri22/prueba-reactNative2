import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonTitle = ({ title, action }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonTitle

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
    margin: 10,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  }
})