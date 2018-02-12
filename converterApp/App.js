import React from 'react';
import { StyleSheet, Text, View, Picker, Image, Alert, TextInput, Button } from 'react-native';
import fx from 'money';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currencies: [], current: '', euroAmount: ''};
  }

  componentDidMount() {
    const url = 'https://api.fixer.io/latest';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({currencies:  responseJson.rates });
        if ( typeof fx !== "undefined" && fx.rates ) {
                fx.rates = responseJson.rates;
                fx.base = responseJson.base;
            } else {
                var fxSetup = {
                    rates : responseJson.rates,
                    base : responseJson.base
                }
            }
      })
      .catch((error) => { 
        Alert.alert(error); 
      });
  }

  convert = () => {
    let key = this.state.current.toString();
    console.log(key);
    let rate = fx.convert(this.state.euroAmount, {from: key, to: "EUR"});
    this.setState({result: rate.toFixed(2)});
  }


  render() {
    const currencies = this.state.currencies
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Euro Converter</Text>
        <Image style={{width: 200, height: 200}} source={require('./donaldo.jpg')} />
        <Text>{this.state.result} €</Text>
        <TextInput style={{width: 200, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}} onChangeText={(euroAmount) => this.setState({euroAmount: euroAmount})} 
            value={this.state.euroAmount} 
            keyboardType='numeric' />
        <Picker
          style={{height:30, width:100}}
          selectedValue={this.state.current}
          onValueChange={(itemValue, itemIndex) => this.setState({current: itemValue})}>
          { Object.keys(currencies).map(function(key) {
              return <Picker.Item value={key} label={key} key={key} />
          })}
          
        </Picker>
        <Button onPress={this.convert} title="Convert"/>

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
  
  header: {
    fontSize: 20,
    color: 'lightgreen',
    marginBottom: 10
  }
});
