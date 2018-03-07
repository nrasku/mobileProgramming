import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';

export default class HomeScreen extends React.Component {
	static navigationOptions = {title: 'Home'};

	constructor(props) {
    super(props);
    this.state = { text: '' }
      
  	}

    buttonPressed = () => {
      Alert.alert("You've typed: " + this.state.text);
    }

	render() {
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.container}>
				<Text style={styles.header}>Welcome</Text>
		        <Image style={{width: 250, height: 150}} source={require('./images/default.jpg')} />
		        <Text style={styles.alertText}>Hello World!</Text>
		        <Button onPress={this.buttonPressed} title="Press Me!"/>
		        <TextInput style={{width: 200, borderColor: 'lightgray',
		          borderWidth: 1, margin: 5}} onChangeText={(text) => this.setState({text})} 
		          value={this.state.text} />
		        <View style={styles.navButtonContainer}>
					<Button style={{width: 100, height: 20}} onPress = {() => navigate('Calculator', {styles: {styles}})} title="Calculator" />
					<Button style={styles.navButton} onPress = {() => navigate('GuessingGame', {styles: {styles}})} title="Guessing Game" />
					<Button style={styles.navButton} onPress = {() => navigate('ShoppingList', {styles: {styles}})} title="Shopping List" />
				</View>
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
    width: 150
  },
  header: {
    fontSize: 20,
    color: 'lightblue',
    marginBottom: 10
  },
  navButtonContainer: {
  	marginTop: 20,
 	flexDirection: 'column',
    justifyContent: 'space-between'
  },
  listItemContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});