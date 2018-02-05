import React from 'react';
import { Text, View, Button, TextInput, FlatList } from 'react-native';

export default class Calculator extends React.Component {

  static navigationOptions = {title: 'ShoppingList'};

  constructor(props) {
    super(props);
    this.state = { item: '', list: [] }
      
  }

  add = () => {
    this.setState({
    	list: [...this.state.list, {key: this.state.item}],
      item: ''
    })
  }
  clear = () => {
  	this.setState({
    	list: []
    })
  }

  render() {
    const { params } = this.props.navigation.state
    return (
    	<View style={params.styles.styles.container}>
        <Text style={params.styles.styles.header}>Shopping List</Text>
    	  <Text>{this.state.result}</Text>
    	  <TextInput style={{width: 200, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}} onChangeText={(item) => this.setState({item: item})} 
            value={this.state.item} />
        <View style={params.styles.styles.buttonContainer}>
          <Button onPress={this.add} title="Add"/>
          <Button onPress={this.clear} title="Clear"/>
        </View>
        <FlatList data={this.state.list} renderItem={({item}) => <Text>{item.key}</Text>}/>
    	</View>
    );
  }

}