import  React,{ useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Checkbox } from 'react-native-paper';

export default function FirstInningsScreen({ navigation }) {
    const [checked, setChecked] = React.useState(false);
    const [widechecked, setWideChecked] = React.useState(false);
    const [noballchecked, setNoballChecked] = React.useState(false);
    const [byeschecked, setByesChecked] = React.useState(false);
    const [legbyeschecked, setLegbyesChecked] = React.useState(false);
    const [wicketchecked, setWicketChecked] = React.useState(false);

    //score hooks
    const [teamname,setTeamName] = useState('');
    const [teamrun,setTeamrun] = useState('');
    const [teamwickets,setTeamwickets] = useState('');
    const [teamovers,setTeamovers] = useState('');
    const [teamrunrate,setTeamrunrate] = useState('');

    //striker batsman hooks
    const [strikername,setStrikername] = useState('');
    const [strikerrun,setStrikerrun] = useState('');
    const [strikerballfaced,setStrikerballfaced] = useState('');
    const [strikerfourcount,setStrikefourcount] = useState('');
    const [strikersixcount,setStrikesixcount] = useState('');
    const [strikersrate,setStrikesrate] = useState('');


    //non-striker batsman hooks
    const [nonstrikername,setNonstrikername] = useState('');
    const [nonstrikerrun,setNonstrikerrun] = useState('');
    const [nonstrikerballfaced,setNonstrikerballfaced] = useState('');
    const [nonstrikerfourcount,setNonstrikefourcount] = useState('');
    const [nonstrikersixcount,setNonstrikesixcount] = useState('');
    const [nonstrikersrate,setnonstrikesrate] = useState('');


    //bowler hooks
    const [bowlername,setBowlername] = useState('');
    const [bowlerover,setBowlerover] = useState('');
    const [bowlermaiden,setBowlermaiden] = useState('');
    const [bowlerruns,setBowlerruns] = useState('');
    const [bowlerwickets,setBowlerwickets] = useState('');


    return (
        
        <View style={styles.container} >
            <ScrollView>
            <View style={styles.contentBody}>
                <View style={styles.cardhead}>
                    <Text style={{ marginBottom: 5 }}>India , 1st innings</Text>
                    <Text style={{ marginTop: 5, marginRight: 50 }}>CRR</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.text}>12 - 0</Text>
                    <Text style={styles.overs}> (1.0) </Text>
                    <Text style={styles.crr}> (1.0) </Text>
                </View>

            </View>
            <View style={styles.battingBody}>
                <Grid >

                    <Row style={{ height: 40, borderBottomWidth: 1, borderBottomColor: '#000' }}>
                        <Col size={60}>
                            <Text style={{ marginBottom: 10, marginRight: 0 }}>Batting </Text>
                        </Col>
                        <Col size={15} >
                            <Text style={{ marginBottom: 10 }}>R </Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>B </Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>6s </Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>4s </Text>
                        </Col>
                        <Col size={10}>
                            <Text style={{ marginBottom: 10 }}>SRR </Text>
                        </Col>
                    </Row>
                    <Row style={{ height: 40, marginTop: 5 }} >
                        <Col size={60}>
                            <Text style={{ marginBottom: 10, marginRight: 0, color: 'green' }}>Virat  * </Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>20</Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>4 </Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>3 </Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>0 </Text>
                        </Col>
                        <Col size={10} >
                            <Text style={{ marginBottom: 10 }}>500 </Text>
                        </Col>
                    </Row>
                    <Row style={{ height: 40 }}>
                        <Col size={60}>
                            <Text style={{ marginBottom: 10, marginRight: 0, color: 'green' }}>Rohit </Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>18</Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>5</Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>0</Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>4</Text>
                        </Col>
                        <Col size={10}>
                            <Text style={{ marginBottom: 10 }}>500 </Text>
                        </Col>
                    </Row>
                    <Row style={{ height: 40, borderBottomWidth: 1, borderBottomColor: '#000' }}>
                        <Col size={60}>
                            <Text style={{ marginBottom: 10, marginRight: 0 }}>Bowling </Text>
                        </Col>
                        <Col size={15} >
                            <Text style={{ marginBottom: 10 }}>O</Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>M </Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>R </Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>W </Text>
                        </Col>
                        <Col size={10}>
                            <Text style={{ marginBottom: 10 }}>ER </Text>
                        </Col>
                    </Row>
                    <Row style={{ height: 40, marginTop: 15, }}>
                        <Col size={60}>
                            <Text style={{ marginBottom: 10, marginRight: 0, color: 'green' }}>Bumrah </Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>0.0</Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>0</Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>0</Text>
                        </Col>
                        <Col size={15}>
                            <Text style={{ marginBottom: 10 }}>0</Text>
                        </Col>
                        <Col size={10}>
                            <Text style={{ marginBottom: 10 }}>0.0 </Text>
                        </Col>
                    </Row>
                </Grid>
            </View>
            <View>
                <View style={styles.container2}>
                    <Text style={{ marginRight: 10 }}>This Over : </Text>
                    <ScrollView horizontal={true}>

                        <View style={styles.circle} >
                            <Text style={styles.textover}>1</Text></View>

                        <View style={styles.circle} >
                            <Text style={styles.textover}>1</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>4</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>6</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>W</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>W</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>W</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>W</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>W</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>W</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>W</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>W</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>W</Text>
                        </View>
                        <View style={styles.circle} >
                            <Text style={styles.textover}>W</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.CheckBoxContainer}>
                    <View style={styles.Checkboxlist}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                style={styles.Checkboxstyle}
                                status={widechecked ? 'checked' : 'unchecked'}
                                onPress={() => { setWideChecked(!widechecked); }}
                                color={'green'}
                                uncheckColor={'red'}
                            />
                            <Text >Wide</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                            <Checkbox
                                style={styles.Checkboxstyle}
                                status={noballchecked ? 'checked' : 'unchecked'}
                                onPress={() => { setNoballChecked(!noballchecked); }}
                                color={'green'}
                                uncheckColor={'red'}
                            />
                            <Text >No Ball</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                            <Checkbox
                                style={styles.Checkboxstyle}
                                status={byeschecked ? 'checked' : 'unchecked'}
                                onPress={() => { setByesChecked(!byeschecked); }}
                                color={'green'}
                                uncheckColor={'red'}
                            />
                            <Text >Byes</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                style={styles.Checkboxstyle}
                                status={legbyeschecked ? 'checked' : 'unchecked'}
                                onPress={() => { setLegbyesChecked(!legbyeschecked); }}
                                color={'green'}
                                uncheckColor={'red'}
                            />
                            <Text >Leg Byes</Text>
                        </View>
                    </View>
                    <View style={styles.Checkboxlist}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                            <Checkbox
                                style={styles.Checkboxstyle}
                                status={wicketchecked ? 'checked' : 'unchecked'}
                                onPress={() => { setWicketChecked(!wicketchecked); }}
                                color={'green'}
                                uncheckColor={'red'}
                            />
                            <Text style={{  marginRight: 10 }}>Wicket</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}> */}
                        <Button

                            style={styles.Checkbutton}
                            color="#fff"
                            onPress={() => Alert.alert('Retired hurt')}
                        >Retire</Button>
                        <Button

                            style={styles.Checkbutton}
                            color="#fff"
                            onPress={() => Alert.alert('BatsMan Swaped')}
                        >Swap </Button>
                    </View>
                    {/* </View> */}
                </View>
                <View>
                    <View style={styles.ScoreContainer}>
                        <View style={styles.Scorelist}>
                            <TouchableOpacity>
                            <View style={styles.Scorecircle} >
                               
                                    <Text style={styles.textscore}>0</Text>
                                
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <View style={styles.Scorecircle} >
                                
                                    <Text style={styles.textscore}>1</Text>
                               
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <View style={styles.Scorecircle} >
                               
                                    <Text style={styles.textscore}>2</Text>
                                
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <View style={styles.Scorecircle} >
                                
                                    <Text style={styles.textscore}>3</Text>
                               
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Scorelist}>
                            <TouchableOpacity>
                            <View style={styles.Scorecircle} >
                                
                                    <Text style={styles.textscore}>4</Text>
                               
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <View style={styles.Scorecircle} >
                               
                                    <Text style={styles.textscore}>5</Text>
                               
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <View style={styles.Scorecircle} >
                                
                                    <Text style={styles.textscore}>6</Text>
                               
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                             
                            <View style={styles.Scorecircle} >
                                <Text style={styles.textscore}>...</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop:40,
        backgroundColor: "#F7F7F7"

    },
    textover: {
        padding: 4,
        marginLeft: 6
    },
    textscore: {
        padding: 4,
        fontSize: 20,
        marginLeft: 19,
        marginTop: 11,
        alignItems: 'center',
    },
    container2: {
        margin: 10,
        borderRadius: 10,
        marginBottom: 2,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#fff',
       
        elevation: 10,
        shadowColor: '#171717',
        
    },
    circle: {
        marginLeft: 5,
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: "#fff",
        borderColor: 'grey',
        borderWidth: 1,
    },
    Scorecircle: {
        margin: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#fff",
        borderColor: 'green',
        textAlign: 'center',
        borderWidth: 2,
    },
    contentBody: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'space-between',
        elevation: 10,
        shadowColor: '#171717',
        
    },
    battingBody: {
        margin: 10,
        padding: 10,
        marginTop: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 220,
        borderRadius: 13,
        elevation: 10,
        shadowColor: '#171717',



    },
    ScoreContainer: {
        margin:10,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 10,
        shadowColor: '#171717',
    },
    CheckBoxContainer: {
        margin: 10,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
        elevation: 10,
        shadowColor: '#171717',
    },
    Scorelist: {
        flexDirection: "row",
    },
    Checkboxlist: {
        flexDirection: "row",
        marginTop: 10,
    },
    Checkboxstyle: {
        marginLeft: 10,
        fontSize: 10,
        borderColor: '#fff'
    },
    Checkbutton: {
        backgroundColor: 'green',
        //padding: 5,
        marginLeft: 5,
        width: 120,
        height: 40,
        fontSize: 15

    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardhead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    text: {
        fontSize: 30
    },
    overs: {
        alignItems: 'flex-start',
        marginTop: 10,
        marginRight: 110,
        
    },
    crr: {
        alignItems: 'flex-start',
        marginTop: 10,
        marginRight: 50,
    },

});
