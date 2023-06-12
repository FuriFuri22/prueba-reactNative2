import { FlatList, View, StyleSheet } from 'react-native'
import React from 'react'
import pokeball from '../images/pokeballs.jpg'
import ButtonTitle from '../components/ButtonTitle'
import { Fondo } from '../components/Fondo'

const HomeView = ({ navigation }) => {
  const views = [
    { title: 'Traer Pokemons', path: 'lista' },
  ]

  const renderItem = ({ item }) => <ButtonTitle title={item.title} action={() => navigation.navigate(item.path)} />

  return (
    <Fondo url={pokeball}>
       <View>
         <FlatList data={views} renderItem={renderItem} />
      </View>
    </Fondo>
   
  )
}

export default HomeView