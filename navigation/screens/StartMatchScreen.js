import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import HomeScreen from './CricketMatchScreen';
import * as SQLite from 'expo-sqlite';
//db creaion
const db = SQLite.openDatabase('db.cricketscoreDb') // returns Database object



export default function StartMatchScreen({ route, navigation }) {
    //getting toss wining team data from cricketMatchScreen
    //const { toss } = route.toss;
    //hooks
    const [striker, setStriker] = useState('');
    const [nonstriker, setNonstriker] = useState('');
    const [bowler, setBowler] = useState('');

    //getting batting & bowling teams data
    const batting = route.params.batting;
    console.log("batting : ", batting);
    const bowling = route.params.bowling;
    console.log("bowling :", bowling);
    var batting_team_id, bowling_team_id;




    useEffect(() => {
        createTable2();
        //deleteTable();
    }, []);

    //creating players table
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
        //checking two openers are same
        if (striker === nonstriker) {
            alert('Openers cannot be the same.');
            return;
        }

        //fething batting teams team_id

        db.transaction((tx) => {
            tx.executeSql(
                "SELECT team_id FROM teams where team_name = ?",
                [batting],
                (tx, results) => {
                    var len = results.rows.length;
                    console.log('len is ', len);

                    if (len > 0) {
                        var teams_id = results.rows.item(0).team_id;
                        batting_team_id = teams_id;

                        console.log("batting id is", batting_team_id);



                    }
                }
            )
        })
        //fething bowling teams team_id
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT team_id FROM teams where team_name = ?",
                [bowling],
                (tx, results) => {
                    var len = results.rows.length;
                    console.log('len is ', len);

                    if (len > 0) {
                        var teams_id2 = results.rows.item(0).team_id;
                        bowling_team_id = teams_id2;

                        console.log("bowling id is", bowling_team_id);



                    }
                }
            )
        })
        //inserting striker data into players table
        db.transaction(tx => {

            tx.executeSql('INSERT INTO players (player_name,team_id) VALUES (?,?)', [striker, batting_team_id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        console.log('inserted striker');

                    }
                },
                (tx, error) => console.log('Error', error))
        });
        //inserting non-stiker data into players table
        db.transaction(tx => {

            tx.executeSql('INSERT INTO players (player_name,team_id) VALUES (?,?)', [nonstriker, batting_team_id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        console.log('inserted non-striker');

                    }
                },
                (tx, error) => console.log('Error', error))
        });
        //inserting bowler data into players table
        db.transaction(tx => {

            tx.executeSql('INSERT INTO players (player_name,team_id) VALUES (?,?)', [bowler, bowling_team_id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        console.log('inserted bowler');

                    }
                },
                (tx, error) => console.log('Error', error))
        });

       //navigating to startmatch screen
    navigation.navigate('FirstInningsScreen' );

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
