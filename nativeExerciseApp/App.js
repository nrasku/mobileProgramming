import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';
import Calculator from './Calculator'
import GuessingGame from './GuessingGame'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '' }
      
  }

  buttonPressed = () => {
    Alert.alert("You've typed: " + this.state.text);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: 250, height: 150}} source={require('./images/default.jpg')} />
        <Text style={styles.alertText}>Hello World!</Text>
        <Button onPress={this.buttonPressed} title="Press Me!"/>
        <TextInput style={{width: 200, borderColor: 'lightgray',
          borderWidth: 1, margin: 5}} onChangeText={(text) => this.setState({text})} 
          value={this.state.text} />
        <Calculator styles={styles} />
        <GuessingGame styles={styles} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alertText: {
        fontSize: 18, 
        color: 'red'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50
  },
  header: {
    fontSize: 20,
    color: 'lightblue',
    marginBottom: 10
  }
});
