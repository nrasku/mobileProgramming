import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements';
import { SQLite } from 'expo';

export default class Calculator extends React.Component {

  static navigationOptions = {title: 'ShoppingList'};

  constructor(props) {
    super(props);
    this.state = { item: '', amount: '', list: [] }
      
  }

  componentDidMount = () => {
    const db = SQLite.openDatabase('shoppingList.db');
    db.transaction(tx => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS items (id integer PRIMARY KEY NOT NULL,
       product text, amount text);`);
    }, null, this.updateList);
  }

  componentWillUnmount = () => {
  }

  saveItem = () => {
    const db = SQLite.openDatabase('shoppingList.db');
    db.transaction(tx => {
      tx.executeSql('INSERT INTO items (product, amount) VALUES (?, ?)',
                    [this.state.item, this.state.amount]);
    }, null, this.updateList)
  }

  updateList = () => {
    const db = SQLite.openDatabase('shoppingList.db');
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM items', [], (_, {rows}) => 
        this.setState({list: rows._array
        })
      );
    });
    console.log(this.state.list);
  }

  deleteItem = (id) => {
    const db = SQLite.openDatabase('shoppingList.db');
    db.transaction(
      tx => { tx.executeSql(`DELETE FROM items WHERE id = ?;`, [id]);
      }, null, this.updateList)
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
    console.log(this.state.list);
    const { params } = this.props.navigation.state
    return (
    	<View style={params.styles.styles.container}>
        <Text style={params.styles.styles.header}>Shopping List</Text>
        <FormLabel>Product</FormLabel>
    	  <FormInput style={{width: 200, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}} onChangeText={(item) => this.setState({item: item})} 
            value={this.state.item} placeholder="Product" />
        <FormLabel>Amount</FormLabel>
        <FormInput style={{width: 200, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}} onChangeText={(amount) => this.setState({amount: amount})} 
            value={this.state.amount} placeholder="Amount" />
        <View style={params.styles.styles.buttonContainer}>
          <Button onPress={this.saveItem.bind(this)} title="Save"/>
        </View>
        <List containerStyle={{width: '100%'}}>
          {
            this.state.list.map((item) => (
              <ListItem 
                key={item.id}
                title={item.product}
                subtitle={item.amount}
                onPress={() => this.deleteItem(item.id)}
              />
            ))
          }
        </List>
    	</View>
    );
  }

}