import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text,Image,Button,Modal,Dimensions,width} from 'react-native';
import { StyleSheet, FlatList, TouchableOpacity,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from "react";
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';


function Item({ item }) {
    const [visible, setVisible] = useState(false);

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
    return (
      <View style={[styles.listItem]}>
        <Image source={require('../screens/image/profile.jpg')}  style={{width:50, height:50,borderRadius:30}} />
        <TouchableOpacity style={{marginLeft:15,marginTop:5,flex:1}}
         onPress={() => navigation.navigate('PlayerDetails')}>
          <Text style={{fontWeight:"bold",marginTop:15}}>{item.PlayerName}</Text>
        </TouchableOpacity>
        

        <View style={styles.icon}>
        <TouchableOpacity onPress={showDialog}>
                    <Ionicons style={styles.icn} name="pencil-sharp" size={23} color="black"></Ionicons>
            </TouchableOpacity>
            <Dialog.Container visible={visible}>
                <Dialog.Title style={{fontWeight:'bold'}}>Update Player ?</Dialog.Title>
                <Dialog.Input label=" ">A_Player</Dialog.Input>
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Ok" onPress={handleDelete} />
            </Dialog.Container>
            <TouchableOpacity 
                onPress={()=>DeleteTeam()}>               
                <Ionicons name='trash-sharp' size={23} color="black" />
            </TouchableOpacity>
         </View>
      </View>
    );
  }
 
      const DeleteTeam = () =>
      Alert.alert("Delete Player","are you sure you want to delete this player?   All the matches playes by this payer will not be deleted",
        [
          {text: "Cancel", onPress: () => console.log("Cancel Pressed"),style: "cancel"},
          {text: "Yes", onPress: () => console.log("OK Pressed") }
        ]
      );
      
  export default class App extends React.Component {
    
    state = {
        data:[
            {
                "PlayerName": "A_Player",
                    // photo: require("/image/profile.jpg")

            },
            {
                "PlayerName": "B_Player",
            },
            {
                "PlayerName": "C_Player",
            }
        ]
      }
      render(){
        return (
            <View style={[styles.card]}>
              <FlatList 
                style={{flex:1}}
                data={this.state.data}
                renderItem={({ item }) => <Item item={item}/>}
                keyExtractor={item => item.email}
              />
            </View>
          );
        }
      }
    


      const styles = StyleSheet.create({
        card: {
          flex: 1,
          backgroundColor: '#F7F7F7'
        },
       
        listItem:{
          margin:10,
          padding:10,
          backgroundColor:"#FFF",
          width:"95%",
          flex:1,
          alignSelf:"center",
          flexDirection:"row",
          borderRadius:5,
          elevation: 10,
          shadowColor: '#171717',
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            alignItems: 'flex-start',
            marginTop:5,
            flex:3,
        },
        icon:{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop:5,
            marginRight:10,
            height:40,
            width:50,
             justifyContent:"center",
             alignItems:"center"
        },
        icn:{
            marginRight:10,
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