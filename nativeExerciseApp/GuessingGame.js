import React from 'react';
import { Text, View, Button, TextInput, Alert } from 'react-native';

export default class GuessingGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = { secretNumber: Math.floor(Math.random() * 100) + 1, 
                   guess: '', result: '', counter: 0, hint: '' }
      
  }

  check = () => {
    let result = '';
    let hint = '';
    let guess = parseInt(this.state.guess);
    let secretNumber = parseInt(this.state.secretNumber);
    this.setState({
      counter: this.state.counter + 1
    })
    if (guess == secretNumber) {
      this.setState({
        secretNumber: Math.floor(Math.random() * 100) + 1,
        guess: '',
        counter: 0
      })
      Alert.alert("You guessed the number in " + this.state.counter + " guesses");
    } else if (guess > secretNumber) {
      result = "Your guess " + guess + " is too high."
    } else if (guess < 0) {
      result = "Your guess " + guess + " is too low."
      hint = "HINT: The secret number is never negative..."
    } else {
      result = "Your guess " + guess + " is too low."
    }
    this.setState({
      result: result,
      hint: hint
    })
  }

  render() {
    return (
    	<View style={this.props.styles.container}>
       <Text style={this.props.styles.header}> Guessing Game</Text>
    	  <Text>{this.state.result}</Text>
        <Text>{this.state.hint}</Text>
    	  <TextInput style={{width: 50, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}} onChangeText={(guess) => this.setState({guess})} 
            value={this.state.guess}
            keyboardType='numeric' />
        <Button onPress={this.check} title="Make a Guess!"/>
    	</View>
    );
  }

}