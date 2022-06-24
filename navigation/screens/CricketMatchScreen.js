import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert,TouchableOpacity} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.cricketDb') // returns Database object








export default function HomeScreen({navigation}) {
  //hooks
  const [hostteam,setHostteam] = useState('');
  const [visitorteam,setVisitorteam] = useState('');  

  
  useEffect( () => {
    createTable()
  });
  //teams table creation 
  const createTable = ()=>{
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS teams (id INTEGER PRIMARY KEY AUTOINCREMENT, team_name TEXT, won INTEGER,lost INTEGER)'
      )
    })
  }
  //inserting teams data to teams table
  const insertData = () => {
    if (!hostteam) {
      alert('Please fill Host Team');
      return;
    }
    if (!visitorteam) {
      alert('Please fill visitor Team');
      return;
    }
    let won = 0;
    let lost = 0;
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO teams (team_name, won, lost) VALUES (?,?,?)',
        [hostteam, won, lost],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Teams Data Saved Successfully',
              [
                {
                  text: 'Ok',
                  
                },
              ],
              { cancelable: false }
            );
          } else alert('Data insertion Failed');
        }
      );
    });

  }



  const data = [
    {
      label: 'Host Team'
    },
    {
      label: 'Visitor Team'
    }
  ];
  const data2 = [
    {
      label: 'Bat'
    },
    {
      label: 'Bowl'
    }
  ];



  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teams</Text>

      <TextInput
        style={styles.input}
        placeholder="Host Team"
        onChangeText={(value) => setHostteam(value)}

      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => setVisitorteam(value)}
        placeholder="Visitor Team"
      />
      <Text style={styles.text}>Toss Won By ?</Text>
      <RadioButtonRN
        data={data}
        selectedBtn={(e) => console.log(e)}
      />
      <Text style={styles.text}>Opted To ?</Text>
      <RadioButtonRN
        data={data2}
        selectedBtn={(e) => console.log(e)}
      />
      <Text style={styles.text}>Overs?</Text>

      <TextInput
        style={styles.input}
        placeholder="16"
        //onChangeText={}
      />


      <View style={styles.buttoncontainer}>
      <TouchableOpacity onPress={() => navigation.navigate('AdvancedSettings')}>
      <Text style={styles.advancedtext}   >Advanced Settings</Text>
      </TouchableOpacity >
        <Button
          color="green"
          title="Start match"
          
          onPress={insertData}
        
        />
        

      </View>

    </View>





  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    padding: 10

  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: 'green',
    marginLeft: 10
  },
  input: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
  },
  buttoncontainer: {
    padding:10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  advancedtext:{
    marginTop:5,
    fontSize: 15,
    marginLeft: 10
  },


});