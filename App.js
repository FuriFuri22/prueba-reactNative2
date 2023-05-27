
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import HomeView from './src/views/HomeView';
import ListPokemonViewCo from './src/views/ListPokemonViewCo';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
   < >
    <NavigationContainer >
      <Stack.Navigator  initialRouteName="Home">
       <Stack.Screen  name="Home" component={HomeView}/>
       <Stack.Screen name="lista" component={ListPokemonViewCo}/>
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
   </>
  );
}





