import React from 'react';
import { Text, View, Button, TextInput, Alert, AsyncStorage } from 'react-native';

export default class GuessingGame extends React.Component {

  static navigationOptions = {title: 'GuessingGame'};

  constructor(props) {
    super(props);
    this.state = { secretNumber: Math.floor(Math.random() * 100) + 1, 
                   guess: '', result: '', counter: 0, hint: '', highscore: '-'}
      
  }

  componentDidMount() {
    this._initialStorage();
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
      this.setHighScore(this.state.counter);
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

  async _initialStorage() {
    try {
        await AsyncStorage.setItem('hc', '0');
      } catch (e) {
        Alert.alert('Error setting the highscore');
      }
  }

   async setHighScore(score) {
    let currentHigh = ''
      try {
        currentHigh = await AsyncStorage.getItem('hc');
      } catch (e) {
        Alert.alert("Error getting highscore");
      }

      if (Number(currentHigh) > score || currentHigh == '0') {
        try {
          await AsyncStorage.setItem('hc', score.toString());
          this.setState({ highscore: score });
        } catch (e) {
          Alert.alert('Error saving your highscore');
        }
      }
    }

  render() {
    const { params } = this.props.navigation.state
    return (
    	<View style={params.styles.styles.container}>
       <Text style={params.styles.styles.header}> Guessing Game</Text>
    	  <Text>{this.state.result}</Text>
        <Text>{this.state.hint}</Text>
    	  <TextInput style={{width: 50, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}} onChangeText={(guess) => this.setState({guess})} 
            value={this.state.guess}
            keyboardType='numeric' />
        <Button onPress={this.check} title="Make a Guess!"/>
        <Text>Highscore: {this.state.highscore}</Text>
    	</View>
    );
  }

}