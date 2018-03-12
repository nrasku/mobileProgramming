import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Keyboard } from 'react-native';
import { FormLabel, FormInput, Button, List, ListItem } from 'react-native-elements';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('placeList.db');

export default class PlaceList extends React.Component {

  static navigationOptions = {title: 'Address List'};

  constructor(props) {
    super(props);
    this.state = {
      address: '', list: []
    }
  }

  componentDidMount = () => {
    db.transaction(tx => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS places (id integer PRIMARY KEY NOT NULL,
       address text);`);
    }, null, this.updateList);
  }

  saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO places (address) VALUES (?)',
                    [this.state.address]);
    }, null, this.updateList)
    Keyboard.dismiss();
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM places', [], (_, {rows}) => 
        this.setState({list: rows._array
        })
      );
    });
    this.setState({
      address: ''
    });

  }

  deleteItem = (id) => {
    db.transaction(
      tx => { tx.executeSql(`DELETE FROM places WHERE id = ?;`, [id]);
      }, null, this.updateList)
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FormLabel>Placefinder</FormLabel>
        <FormInput style={{width: 200, borderColor: 'lightgray',
            borderWidth: 1, margin: 5}}  placeholder="Type in Address" 
            value={this.state.address}
            onChangeText={(address) => this.setState({address: address})} />
        <Button onPress={this.saveItem} title="Save"/>
        <List containerStyle={{width: '100%'}}>
          {
            this.state.list.map((item) => (
              <TouchableHighlight key={item.address + "-" + item.id} onPress = {() => navigate('MapViewer', {styles: styles, 
                                                                                                              address: item.address})} 
                                  onLongPress = {() => this.deleteItem(item.id)}>
                <ListItem 
                key={item.id} 
                title={item.address}
                rightTitle={'show on map'}
                 />
             </TouchableHighlight>
            ))
          }
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
