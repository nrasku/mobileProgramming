import React from 'react';
import { Text, View, Button, TextInput, FlatList } from 'react-native';

export default class Calculator extends React.Component {

  static navigationOptions = {title: 'Calculator'};

  constructor(props) {
    super(props);
    this.state = { number1: '', number2: '', result: '', history: [] }
  }

  sum = () => {
    let result = parseInt(this.state.number1 + this.state.number2)
    this.setState({
    	result: "Result: " + result
    })
    this.addToList("+", result);
  }
  substraction = () => {
    let result = parseInt(this.state.number1 - this.state.number2)
  	this.setState({
    	result: "Result: " + result
    })
    this.addToList("-", result);
  }

  addToList = (operation,result) => {
    let newItem = this.state.number1 + ' ' + operation + ' ' + this.state.number2 + " = " + result
    this.setState({
      history: [...this.state.history, {key: newItem}]
    })
  }

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
    	<View style={params.styles.styles.container}>
        <Text style={params.styles.styles.header}>Simple Calculator</Text>
    	  <Text>{this.state.result}</Text>
    	  <TextInput style={{width: 200, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}} onChangeText={(number1) => this.setState({number1: parseInt(number1)})} 
            value={this.state.number1}
            keyboardType='numeric' />
          <TextInput style={{width: 200, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}} onChangeText={(number2) => this.setState({number2: parseInt(number2)})} 
            value={this.state.number2}
            keyboardType='numeric' />
          <View style={params.styles.styles.buttonContainer}>
            <Button onPress={this.sum} title="+"/>
            <Button onPress={this.substraction} title="-"/>
            <Button onPress = {() => navigate('CalculationHistory', {history: this.state.history, styles: params.styles.styles})} title="History" />
          </View>
    	</View>
    );
  }

}