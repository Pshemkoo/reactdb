import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Sqlite from './dbactions/Sqlite';
import Firebase from './dbactions/Firebase';

export default function Details({ route: { params } }) {
    const handleBackButton = () => {
      params.navigation.navigate('Lista');
      return true;
    };

    const handleDeleteButton = (id) => {
        // const sqlite = new Sqlite();
        // sqlite.removeRaport(id);
        const firebase = new Firebase();
        firebase.removeRaport(id);
    };
  
    const { id, name, imgUrl, type, burningRate, date } =  params.details;
  
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Nazwa pojazdu: {name}</Text>
        <Text style={styles.headline}>Link do zdjęcia:</Text>
        <Text style={styles.headline}>{imgUrl}</Text>
        <Text style={styles.headline}>Rodzaj paliwa: {type}</Text>
        <Text style={styles.headline}>Wskaźnik spalania(l / 100km): {burningRate}</Text>
        <Text style={styles.headline}>Data dodania raportu: {date}</Text>
        <Text style={styles.headline}></Text>
        <Button
          title="Wstecz"
          onPress={handleBackButton}
          color="orange"
          style={{marginTop: '5'}}
        />
        <Text style={styles.headline}></Text>
        <Button
          title="Usuń"
          onPress={() => handleDeleteButton(id)}
          color="red"
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#bbb',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 15
    },
    button: {
      borderRadius: 15,
      marginTop: 24
    },
    headline:{
        textAlign: 'center',
        marginTop: 5
    }
  });