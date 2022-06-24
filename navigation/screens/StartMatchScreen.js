import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';



export default function StartMatchScreen() {
    const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Striker</Text>

            <TextInput
                style={styles.input}
                placeholder="Player Name"
                onChangeText={onChangeText}
            />
            <Text style={styles.text}>Non Striker</Text>

            <TextInput
                style={styles.input}
                placeholder="Player Name"
                onChangeText={onChangeText}

            />
            <Text style={styles.text}>Opening Bowler</Text>

            <TextInput
                style={styles.input}
                placeholder="Player Name"
                onChangeText={onChangeText}
            />
            <View style={{marginTop:10,padding:5}}>
            <Button
                    color="green"
                    title="Start match"
                    
                />
            </View>



        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'green',
        marginLeft: 10,
        marginTop:10
    },
    input: {
        height: 40,
        margin: 8,
        borderBottomWidth: 1,
        padding: 10,
    },
});  