import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import React, { useState } from 'react';


export default function UpdatePlayer() {

    return (
        <View style={styles.container}>
        <Text style={styles.text}>Player Name</Text>

        <TextInput
            style={styles.input}
            placeholder="Player Name"
            /* onChangeText={ (value) => setStriker(value) */ 
        />
        <Button color='green'title='Update Player'/>
        
        </View>
        
 

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:5

    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'green',
        marginLeft: 10,
        marginTop: 10
    },
    input: {
        height: 40,
        margin: 8,
        borderBottomWidth: 1,
        padding: 10,
        marginBottom:10
    },
    
});
