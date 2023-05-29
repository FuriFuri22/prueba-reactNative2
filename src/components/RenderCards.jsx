import React from "react";
import Card from "./Card";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

export const Renderizado = ({ theData, colors, onPressEliminar}) => {
  
  return (
    <FlatList
      data={theData}
      renderItem={({ item }) => (
        <Card uri={{ uri: item.imagen }} nombre={item.nombre} color={colors}>
           <TouchableOpacity 
             style={styles.deleteButton}
             onPress={()=>onPressEliminar(item.id)}
             >
              <Text style={styles.text}>Eliminar</Text>
           </TouchableOpacity>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  deleteButton: {
      backgroundColor: 'red',
      borderRadius:5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginTop: 10,
    },
    text: {
      color: 'black'
    }
})
