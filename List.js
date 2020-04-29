import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Image, Button, TouchableHighlight, Alert } from 'react-native';
import Sqlite from './dbactions/Sqlite';
import Firebase from './dbactions/Firebase';


export default class List extends React.Component {
    state = { list: [] };
    componentDidMount() {
        // const sqlite = new Sqlite();
        // sqlite.fetchRaports((list) => {
        //     this.setState({ list: [...list] })
        // });
        const firebase = new Firebase();
        firebase.fetchRaports((list) => {
            this.setState({ list: [...list] })
        });
    };

    handleDetails = item => {
        this.props.navigation.navigate('Szczegóły', {
            details: item,
            navigation: this.props.navigation
        });
    };

    handleForm = () => {
        this.props.navigation.navigate('Formularz');
        return true;
    };

    handleDeleteButton = (id) => {
        // const sqlite = new Sqlite();
        // sqlite.removeRaport(id);
        const firebase = new Firebase();
        firebase.removeRaport(id);
    };

    handleRemove = (id) => {
        Alert.alert(
            'Usuń',
            'Czy na pewno chcesz usunąć ten element?',
            [
              {text: 'Tak', onPress: () => this.handleDeleteButton(id)},
              {text: 'Anuluj', onPress: () => console.log('cancel'), style: 'cancel'},
            ],
            { cancelable: false }
          )
    };

    render () {
        return(
            <View>
            <FlatList
                    data={this.state.list}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableHighlight 
                            onPress={() => this.handleDetails(item)}
                            onLongPress={() => this.handleRemove(item.id)}>
                            <View>
                                <Image source={{ uri: item.imgUrl }} 
                                    style={{ height: 150, flex: 1 }}/>
                                <View>
                                    <Text style={styles.headline}>Nazwa: {item.name}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )}
            />
            <View style={[{ margin: 15}]}>
                <Button title="Dodaj"
                    onPress={this.handleForm}>
                </Button>
            </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        borderColor: '#333',
        borderRadius: 3,
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 6,
        marginTop: 4,
        marginBottom: 8,
        width: 300
    },
    button: {
        borderRadius: 3,
        marginTop: 14
    },
    calendar: {
        display: 'flex'
    },
    headline:{
        textAlign: 'center',
        marginTop: 5,
        marginBottom:5
    }
});