// Gift Card Screen using react-native-confetti-cannon
// https://aboutreact.com/react-native-confetti-cannon/

// import React in our code
import React, { useEffect, useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

//Import Library to make a cannon
import ConfettiCannon from 'react-native-confetti-cannon';

const App = () => {
  const [shoot, setShoot] = useState(false);

  useEffect(() => {

    setShoot(true);

  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/*Card to show the Gift*/}
        <View style={styles.cardStyle}>
          <Text style={styles.headingStyle}>
            Congratulations !!
          </Text>
          <View style={styles.simpleLineStyle} />
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>India</Text>
          <Text style={styles.paragraph}>
            Team india Won by 10 Wickets
          </Text>


        </View>
        {/*Cannon which will fire whenever shoot is true*/}
        {shoot ?
          <ConfettiCannon
            count={200} origin={{ x: -10, y: 0 }} fadeOut="true"
          />
          : null
        }
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 12,
  },
  cardStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  textLargeStyle: {
    margin: 24,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
  simpleLineStyle: {
    backgroundColor: 'grey',
    width: '100%',
    height: 1,
  },
  headingStyle: {
    margin: 24,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },

});
