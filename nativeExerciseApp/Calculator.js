import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';

export default class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = { number1: '', number2: '', result: '' }
      
  }

  sum = () => {
    this.setState({
    	result: "Result: " + parseInt(this.state.number1 + this.state.number2)
    })
  }
  substraction = () => {
  	this.setState({
    	result: "Result: " + parseInt(this.state.number1 - this.state.number2)
    })
  }

  render() {
    return (
    	<View style={this.props.styles.container}>
        <Text style={this.props.styles.header}>Simple Calculator</Text>
    	  <Text>{this.state.result}</Text>
    	  <TextInput style={{width: 200, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}} onChangeText={(number1) => this.setState({number1: parseInt(number1)})} 
            value={this.state.number1}
            keyboardType='numeric' />
          <TextInput style={{width: 200, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}} onChangeText={(number2) => this.setState({number2: parseInt(number2)})} 
            value={this.state.number2}
            keyboardType='numeric' />
          <View style={this.props.styles.buttonContainer}>
            <Button style={this.props.styles.button} onPress={this.sum} title="+"/>
            <Button style={this.props.styles.button} onPress={this.substraction} title="-"/>
          </View>
    	</View>
    );
  }

}