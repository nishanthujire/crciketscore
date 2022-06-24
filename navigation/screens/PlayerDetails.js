import * as React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Col, Row, Grid } from 'react-native-easy-grid';



function DisplayAnImage(){
    return (
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require('../screens/image/profile.jpg')}
        />
        </View>
    );
}
function Batting() {
  return (
    <View style={styles.container}>
    <Grid>
      <Col size={25}>
        <Row style={styles.cell}>
          <Text style={{ fontSize: 20,  color: '#000'}}>Matches </Text>
          <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>

        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Not Outs </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Average </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0.00</Text>
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Thirties </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Ducks </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
      </Col>
      <Col size={25}>
      <Row style={styles.cell}>
        <Text style={{ fontSize: 20,  color: '#000'}}>Innings </Text>
        <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>       
      </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Best Score </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000'}}>Fours </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Fifties </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
      </Col>
      <Col size={25}>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000'}}>Runs </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Strike Rate </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0.00</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000'}}>Sixes </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Hundreds </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
      </Col>
    </Grid>
    
  </View>
  );
}

function Bowling() {
  return (
    <View style={styles.container}>
    <Grid>
      <Col size={25}>
        <Row style={styles.cell}>
          <Text style={{ fontSize: 20, color: '#000'}}>Matches </Text>
          <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>

        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Maidens </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>B.Bowling </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>-</Text>
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Average </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0.00</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Dots Balls </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
      </Col>
      <Col size={25}>
      <Row style={styles.cell}>
        <Text style={{ fontSize: 20,  color: '#000'}}>Innings </Text>
        <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>       
      </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Wickets </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000'}}>Eco.Rate </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0.00</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Wides </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>4Wickets </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
      </Col>
      <Col size={25}>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Overs </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0.0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Runs </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000'}}>Strike Rate </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0.00</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000'}}>No Balls </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,color: '#000'}}>5Wickets </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
      </Col>
    </Grid>
    
  </View>
  );
}
function Fielding() {
    return (
        <View style={styles.container}>
    <Grid>
        <Col size={25}>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Matches </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Run Outs </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        </Col>
        <Col size={25}>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20, color: '#000'}}>Catches </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        </Col>
        <Col size={25}>
        <Row style={styles.cell}>
            <Text style={{ fontSize: 20,  color: '#000'}}>Stumpings </Text>
            <Text style={{ fontSize: 20,  color: '#000'}}>0</Text>        
        </Row>
        </Col>
        </Grid>
    
        </View>
    );
  }

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (

      <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        labelStyle: { textTransform: "none", fontSize: 18,},
        style: {
            backgroundColor: 'green',
            
        },
        indicatorStyle: {
            backgroundColor: 'white',
        },
        }}
      >

        <Tab.Screen style={styles.tabnav} name="Batting" component={Batting}  />
        <Tab.Screen style={styles.tabnav} name="Bowling" component={Bowling} />
        <Tab.Screen style={styles.tabnav} name="Fielding" component={Fielding} />
      </Tab.Navigator>
    
  );
}
const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      padding: 16,
      backgroundColor: '#e6e6e6',
    },
    tabnav:{
        color:'#fff',
    },
    cell: {
      backgroundColor: '#fff',
      margin:6,
      padding:5,
      flex:1,
      flexDirection: 'column',
      maxHeight:80,
      maxWidth:'100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });