import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, StatusBar, Image } from 'react-native';

//
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {recipes: [], ingredient: '', recipe: ''};
  }

  getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + this.state.ingredient + '&q=' + this.state.recipe;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({recipes: responseJson.results});
        this.setDef();
      })
      .catch((error) => { 
        Alert.alert(error); 
      });    
  }

  setDef = () => {
    this.state.recipes.forEach(function(item) { 
      console.log(item);
      if (item.thumbnail == "") {
        item.thumbnail = 'http://tutaki.org.nz/wp-content/uploads/2016/04/no-image-available.png';
      }
    
    });
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.key} 
          renderItem={({item}) => <View>
                                    <Text>
                                      {item.title}
                                    </Text>
                                    <Image style={{width: 50, height: 50}} source={{uri: item.thumbnail}}/>
                                  </View>} data={this.state.recipes} 
          ItemSeparatorComponent={this.listSeparator} /> 
        <TextInput style={{fontSize: 18, width: 200}} placeholder='Ingredient' onChangeText={(ingredient) => this.setState({ingredient})} />
        <TextInput style={{fontSize: 18, width: 200}} placeholder='Recipe' onChangeText={(recipe) => this.setState({recipe})} />
        <Button title="Find" onPress={this.getRecipes} />
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