import { setStatusBarHidden } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-iconsAntDesign';
import { RadioButton } from 'react-native-paper';



export default PlayerRetired = ({ route, navigation }) => {
  const [name, setName] = useState(null);
  const[choice, setChoice] = useState("a");
  var val;
  //getting batting & bowling teams data
  const strikername = route.params.striker;
  console.log("striker : ", strikername);
  const nonstrikername = route.params.nonstriker;
  console.log("non striker :", nonstrikername);


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Select player to retire
      </Text>

      <RadioButton.Group onValueChange={newValue => setChoice(newValue)} value={choice} >
        <View style={styles.radiobutton}>

          <RadioButton color='green' value={strikername} />
          <Text style={{ marginTop: 7 }}>{strikername}</Text>
        </View>
        <View style={{ flexDirection: 'row', }}>

          <RadioButton color='green' value={nonstrikername} />
          <Text style={{ marginTop: 7 }}>{nonstrikername}</Text>
        </View>
      </RadioButton.Group>

      <Text style={styles.sectitleText}>
        Replaced by?
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Player name"
        inp
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} >Done</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    //marginTop: 30,
  },
  input: {
    height: 40,
    borderWidth: 1, padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: 'green',
  },
  button: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',

  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: 'green',
    marginBottom: 5

  },
  sectitleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: 'green',
    marginBottom: 20
  },
  dropdown: {
    marginBottom: 20,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  radiobutton: {
    flexDirection: 'row',
  },

});