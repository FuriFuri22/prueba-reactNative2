import { useEffect, useState } from 'react';
import {TouchableOpacity, FlatList, StyleSheet, View, Text} from 'react-native';
import api_fetch from '../helpers/api_fetch';
import Card from '../components/Card';
import { Fondo } from '../components/Fondo';


export default function ListPokemonViewCo() {
  const [pokemon, setPokemon]= useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const renderizado = ()=>{
    return <FlatList 
    data={filteredPokemons} 
    renderItem={({item})=>(
      <Card uri={{uri:item.imagen}} nombre={item.nombre}/> )}/>
  }

  const tiposList = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy'
  ]

   const renderTipo = ()=><FlatList
    data={tiposList}
    renderItem={({item})=>renderTypeButton(item)}/>

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
      setSelectedType('');
    } else {
      // Filtra los Pokémon por el tipo seleccionado
      const filtered = pokemon.filter((pokemon) =>
        pokemon.tipo.some((t) => t.type.name === type)
      );
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
      <View style={styles.contentContainer}>
        <View style={styles.typeButtonsContainer}>
          {renderTipo()}
        </View>
        <View style={styles.renderContainer}>
          {renderizado()}
        </View>
      </View>
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
    typeButtonsContainer:{
      flex: 1,
      flexDirection: 'column'
    },
    typeButton: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 15,
      marginHorizontal: 2,
      backgroundColor: 'pink',
    },
    selectedTypeButton: {
      backgroundColor: 'blue',
    },
    typeButtonText: {
      color: 'white',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
      },
    renderContainer: {
        flex: 3,
        flexDirection:'column',
    }
  });