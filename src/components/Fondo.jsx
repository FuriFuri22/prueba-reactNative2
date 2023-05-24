import React from "react";

import { View,ImageBackground, StyleSheet } from "react-native";

export const Fondo = ({url, children})=>{
    return(
        <ImageBackground style={styles.fondo} source={url} resizeMode="stretch">
         <View style={styles.overlay}>
         {children}
         </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        resizeMode: 'cover', // Ajusta la imagen para cubrir toda la pantalla
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Puedes ajustar la opacidad según tus necesidades
        justifyContent: 'center',
        alignItems: 'center',
      }
})