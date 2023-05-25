import { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, View, Text, Picker } from 'react-native';
import api_fetch from '../helpers/api_fetch';
import Card from '../components/Card';
import { Fondo } from '../components/Fondo';

export default function ListPokemonsView() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await api_fetch();
      setPokemon(data);
      setFilteredPokemons(data);
    };

    fetchData();
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

  return (
    <Fondo url={require('../images/pokeballs.jpg')}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => filterPokemonsByType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Fire" value="fire" />
            <Picker.Item label="Fighting" value="fighting" />
            <Picker.Item label="Water" value="water" />
            <Picker.Item label="Grass" value="grass" />
            <Picker.Item label="Poison" value="poison" />
            <Picker.Item label="Ground" value="ground" />
            <Picker.Item label="Rock" value="rock" />
            <Picker.Item label="Bug" value="bug" />
            <Picker.Item label="Ghost" value="ghost" />
            <Picker.Item label="Steel" value="steel" />
            <Picker.Item label="Electric" value="electric" />
            <Picker.Item label="Psychic" value="psychic" />
            <Picker.Item label="Ice" value="ice" />
            <Picker.Item label="Dragon" value="dragon" />
            <Picker.Item label="Dark" value="dark" />
            <Picker.Item label="Fairy" value="fairy" />
            {/* Agregar más elementos para otros tipos de Pokémon */}
          </Picker>
        </View>
        <FlatList
          data={filteredPokemons}
          renderItem={({ item }) => <Card uri={{ uri: item.imagen }} nombre={item.nombre} />}
          keyExtractor={(item) => item.nombre}
        />
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  picker: {
    height: 40,
    color: 'black',
  },
});
