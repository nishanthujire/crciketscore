import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import HomeScreen from './CricketMatchScreen';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.cricketDb') // returns Database object



export default function StartMatchScreen({ route }) {
    //getting toss wining team data from cricketMatchScreen
    //const { toss } = route.toss;
    //hooks
    const [striker, setStriker] = useState('');
    const [nonstriker, setNonstriker] = useState('');
    const [bowler, setBowler] = useState('');

    const toss = route.params.toss;
    console.log(toss);


    useEffect(() => {
        createTable2();
        //deleteTable();
    }, []);

    //creating palyers table
    const createTable2 = () => {

        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS players (player_id INTEGER PRIMARY KEY AUTOINCREMENT,player_name TEXT,team_id INTEGER)'
            )
        })



    }
    //inserting player data into player table

    const insertPlayerData = () => {
        //data validation
        if (!striker || !nonstriker || !bowler) {
            alert('Please fill players details.');
            return;
        }
        //inserting data into matches table
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM teams where team_name = ?',
                ['Diy'],
                (tx, results) => {
                    
                    var len = results.rows.length;
                    if (len > 0) {
                        console.log("gg",results.rows.item(0).team_name);
                    }
                    
                }
            );
            tx.executeSql('INSERT INTO players (player_name,team_id) VALUES (?,?)', [striker, 1],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        console.log('inserted players');
                        //alert('inserted matches');
                    }
                },
                (tx, error) => console.log('Error', error))
        });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Striker</Text>

            <TextInput
                style={styles.input}
                placeholder="Player Name"
                onChangeText={(value) => setStriker(value)}
            />
            <Text style={styles.text}>Non Striker</Text>

            <TextInput
                style={styles.input}
                placeholder="Player Name"
                onChangeText={(value) => setNonstriker(value)}


            />
            <Text style={styles.text}>Opening Bowler</Text>

            <TextInput
                style={styles.input}
                placeholder="Player Name"
                onChangeText={(value) => setBowler(value)}

            />
            <View style={{ marginTop: 10, padding: 5 }}>
                <Button
                    onPress={insertPlayerData}
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
        marginTop: 10
    },
    input: {
        height: 40,
        margin: 8,
        borderBottomWidth: 1,
        padding: 10,
    },
});  
