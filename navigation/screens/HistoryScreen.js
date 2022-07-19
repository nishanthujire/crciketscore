import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text,Image,Button,Modal,Dimensions,width,SafeAreaView} from 'react-native';
import { StyleSheet, FlatList, TouchableOpacity,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";
import {useState,useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.cricketscoreDb') // returns Database object


const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM players',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  });

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Team1: {item.player_id}</Text>
        <Text>Team2: {item.player_name}</Text>
        <Text>Toss: {item.team_id}</Text>
        {/* <Text>opted: {item.opted}</Text>
        <Text>overs: {item.overs}</Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;