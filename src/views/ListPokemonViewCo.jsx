import { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, View, Text } from 'react-native';
import api_fetch from '../helpers/api_fetch';
import tiposList from '../helpers/typesPokes';
import { Fondo } from '../components/Fondo';
import { Renderizado } from '../components/RenderCards';
import pokeballs from '../images/pokeballs.jpg';

export default function ListPokemonViewCo() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const fondo = () => {
    const tipoSeleccionado = tiposList.find((tipo) => tipo.tipo === selectedType);
    return tipoSeleccionado ? tipoSeleccionado.fondo : pokeballs;
  };

  const renderTipo = () => (
    <FlatList
      data={tiposList}
      renderItem={({ item }) => renderTypeButton(item)}
      keyExtractor={(item) => item.tipo}
    />
  );

  useEffect(() => {
    (async () => {
      const data = await api_fetch();
      setPokemon(data);
      setFilteredPokemons(data);
    })();
  }, []);

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

  const eliminar = (id) => {
    const pokemons = filteredPokemons.filter((poke) => poke.id !== id);
    setFilteredPokemons(pokemons);
  };

  const renderTypeButton = (type) => (
    <TouchableOpacity
      style={[
        styles.typeButton,
        selectedType === type.tipo && styles.selectedTypeButton,
      ]}
      onPress={() => filterPokemonsByType(type.tipo)}
    >
      <Text
        style={[
          selectedType === type.tipo ? styles.typeButtonTextNext : styles.typeButtonText,
        ]}
      >
        {type.nombre}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Fondo url={fondo()}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.typeButtonsContainer}>{renderTipo()}</View>
          <View style={styles.renderContainer}>
            <Renderizado 
            theData={filteredPokemons} 
            colors={selectedType} 
            onPressEliminar={eliminar} />
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

  typeButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 2,
    backgroundColor: 'red',
  },
  selectedTypeButton: {
    backgroundColor: 'white',
  },
  typeButtonText: {
    color: 'white',
  },
  typeButtonTextNext: {
    color: 'red',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  renderContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  typeButtonsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});
