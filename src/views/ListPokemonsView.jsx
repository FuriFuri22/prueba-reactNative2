
import { useEffect, useState } from 'react';
import {TouchableOpacity, FlatList, StyleSheet, View, Text} from 'react-native';
import api_fetch from '../helpers/api_fetch';
import Card from '../components/Card';
import { Fondo } from '../components/Fondo';


export default function ListPokemonsView() {
  const [pokemon, setPokemon]= useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const renderizado = ()=>{
    return <FlatList 
    data={pokemon} 
    renderItem={({item})=>(
      <Card uri={{uri:item.imagen}} nombre={item.nombre}/> )}/>
  }

useEffect(()=>{
  (async()=>{
    const data = await api_fetch();
    setPokemon(data);
    setFilteredPokemons(data);
  })()//una funcion autoconvocada asincronica 
},[]);

const filterPokemonsByType = (type) => {
  if (type === selectedType) {
    // Si se selecciona el mismo tipo, muestra todos los Pokémon
    setFilteredPokemons(pokemon);
    setSelectedType(null);
  } else {
    // Filtra los Pokémon por el tipo seleccionado
    const filtered = pokemon.filter((pokemon) =>{ 
      return pokemon.tipo.some((tipo) => tipo.type.name === type);
    });
    setFilteredPokemons(filtered);
    setSelectedType(type);
  }
};

const renderTypeButton = (type) => (
  <TouchableOpacity
    style={[
      styles.typeButton,
      selectedType === type && styles.selectedTypeButton,
    ]}
    onPress={() => filterPokemonsByType(type)}
  >
    <Text style={styles.typeButtonText}>{type}</Text>
  </TouchableOpacity>
);
    
  return (
    <Fondo url={require('../images/pokeballs.jpg')}>
     <View style={styles.container}>
     <View style={styles.typeButtonsContainer}>
        {renderTypeButton('normal')}
        {renderTypeButton('fire')}
        {renderTypeButton('fantasma')}
        {renderTypeButton('agua')}
        {renderTypeButton('planta')}
        {/* Agrega más botones para otros tipos de Pokémon */}
      </View>
      <FlatList
        data={filteredPokemons}
        renderItem={renderizado}
        keyExtractor={(item) => item.nombre}
      />
     {/*renderizado()*/}
    </View>
 </Fondo>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
  },
  selectedTypeButton: {
    backgroundColor: 'blue',
  },
  typeButtonText: {
    color: 'white',
  }
});