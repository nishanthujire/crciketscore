import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, Button, Modal, Dimensions, width, SafeAreaView } from 'react-native';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

//db creaion
const db = SQLite.openDatabase('db.cricketscoreDb') // returns Database object



export default function TeamsDetails({ route }) {
  let [flatPlayerListItems, setFlatPlayerListItems] = useState([]);
  //getting teams id data
  const team_id = route.params.teamid;
  //console.log("team id : ", team_id);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM players where team_id = ?',
        [team_id],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setFlatPlayerListItems(temp);
        }
      );
    });
  });
  const [visible, setVisible] = useState(false);
  //const [items, setItems] = useState([]);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };
  const navigation = useNavigation();

  //delete a players data
  const DeleteTeam = () =>
    Alert.alert("Delete Player", "are you sure you want to delete this player?   All the matches playes by this payer will not be deleted",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Yes", onPress: () => console.log("OK Pressed") }
      ]
    );


  // const navigatePlayerDetails = (item) => {
  //   var team_id = item.team_id;
  //   navigation.navigate('Team_Details')

  // };

  let listItemView = (item) => {
    //function to show the user flatlist item views

    //onPress={() => navigation.navigate('Team_Details') }

    return (
      <View style={[styles.listItem]}>
        <Image source={require('../screens/image/profile.jpg')} style={{ width: 50, height: 50, borderRadius: 30 }} />
        <TouchableOpacity style={{ marginLeft: 15, marginTop: 5, flex: 1 }}
          onPress={() => navigation.navigate('PlayerDetails')}>
          <Text style={{ fontWeight: "bold", marginTop: 15 }}>{item.player_name}</Text>
        </TouchableOpacity>


        <View style={styles.icon}>
          <TouchableOpacity onPress={showDialog}>
            <Ionicons style={styles.icn} name="pencil-sharp" size={23} color="black"></Ionicons>
          </TouchableOpacity>
          <Dialog.Container visible={visible}>
            <Dialog.Title style={{ fontWeight: 'bold' }}>Update Player ?</Dialog.Title>
            <Dialog.Input label=" ">A_Player</Dialog.Input>
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Ok" onPress={handleDelete} />
          </Dialog.Container>
          <TouchableOpacity
            onPress={() => DeleteTeam()}>
            <Ionicons name='trash-sharp' size={23} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatPlayerListItems}
            //ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item) => item.player_id}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },

  listItem: {
    margin: 10,
    padding: 2,
    backgroundColor: "#FFF",
    width: "95%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#171717',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'flex-start',
    flex: 3,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    marginRight: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  icn: {
    marginRight: 10,
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) },
    { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
  },
});




