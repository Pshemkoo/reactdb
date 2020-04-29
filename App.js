import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sqlite from './dbactions/Sqlite';
import { StyleSheet } from 'react-native';
import Form from './Form';
import List from './List';
import Details from './Details';
import Firebase from './dbactions/Firebase';

const Stack = createStackNavigator();

export default function App() {
    // const sqlite = new Sqlite();
    // sqlite.initialize();
    const firebase = new Firebase();
    firebase.initialize();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={List} />
        <Stack.Screen name="Formularz" component={Form} />
        <Stack.Screen name="Szczegóły" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
