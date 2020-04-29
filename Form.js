import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button,
  Picker,
  Image,
  View
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';
import Sqlite from './dbactions/Sqlite';
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import Firebase from './dbactions/Firebase';


export default function Form({ navigation }) {
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [type, setType] = useState('benzyna');
  const [burningRate, setBurningRate] = useState(0);
  const [date, setDate] = useState(new Date());

  const handleAdd = () => {
    // const sqlite = new Sqlite();
    // sqlite.addRaport({name, imgUrl, type, burningRate, date:new Date().toLocaleDateString() });
    const firebase = new Firebase();
    firebase.addRaport({name, imgUrl, type, burningRate, date:new Date().toLocaleDateString() });
  };

  return (
    <View style={styles.container}>
      {/* <Dialog
          visible={!true}
          dialogTitle={<DialogTitle title="Okno dialogowe" />}
          onTouchOutside={() => {
            // this.setState({ visible: false });
          }}
        >
          <DialogContent style={{ width: 300, margin: 10 }}>
            <Text style={{ margin: 10 }}>
              Spalanie dla samochodu Samochod 1 zostało pomyślnie dodane do bazy
              spalań
            </Text>
            <Button style={{ width: 100 }} title="ok" />
          </DialogContent>
    </Dialog> */}
      <Text>Nazwa pojazdu:</Text>
      <TextInput onChangeText={x => setName(x)}
        value={name.toString()}
        style={styles.textInput}
      />
      <Text>Link do zdjęcia:</Text>
      <TextInput onChangeText={x => setImgUrl(x)}
        value={imgUrl.toString()}
        style={styles.textInput}
      />
      <Text>Rodzaj paliwa:</Text>
      <Picker selectedValue={type} style={{ height: 50, width: 300 }}
        onValueChange={(itemValue, itemIndex) => {
          setType(itemValue);
        }}>
        <Picker.Item label="benzyna" value="benzyna" />
        <Picker.Item label="diesel" value="diesel" />
        <Picker.Item label="gaz" value="gaz" />
      </Picker>
      <Text>Wskaźnik spalania(l / 100km):</Text>
      <TextInput keyboardType='numeric'
        onChangeText={x => setBurningRate(x)}
        value={burningRate.toString()}
        style={styles.textInput}
      />
      <Text>Data dodania raportu:</Text>
      <DatePicker style={{ width: 200, marginBottom: 10 }}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD" minDate="1990-01-01" maxDate="2200-01-01"
        confirmBtnText="Confirm" cancelBtnText="Cancel"
        customStyles={{
          dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 },
          dateInput: { marginLeft: 0 }
        }}
        onDateChange={date => setDate(date)} />
      <View style={[{ margin: 5}]}>
        <Button title="Dodaj"
          style={styles.button}
          color="green"
          onPress={handleAdd}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbb',
    margin: 15
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
  }
});