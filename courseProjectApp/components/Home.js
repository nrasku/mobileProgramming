import React from 'react';
import { AppRegistry,
		  StyleSheet,
		  Text,
		  View,
		  Animated,
		  Image,
		  Easing, Button } from 'react-native';

export default class Home extends React.Component {

	static navigationOptions = {title: 'Home'};

	constructor(props) {
		super(props);
		this.spinValue = new Animated.Value(0);
		this.state = {}
	}

	componentDidMount = () => {
		this.spin();
	}

	spin = () => {
		this.spinValue.setValue(0)
		Animated.timing(
			this.spinValue,	{
				toValue: 1,
				duration: 4000,
				easing: Easing.linear
			}
		).start(() => this.spin())
	}

	render() {
		const { navigate } = this.props.navigation;
		const spin = this.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg']
		})
		return(
			<View style={{flex: 1,
					    backgroundColor: '#fff',
					    alignItems: 'center',
					    justifyContent: 'center'}}>
		    	<Text style={{fontWeight: '600', fontSize: 20, marginBottom: 50, color: '#1e7449'}}>FootyResults</Text>
				<Animated.Image
			        style={{
			          width: 250, height: 250,
			          transform: [{rotate: spin}] }}
			          source={require('../images/misc/ball.jpg')}
			      />
			      <Button color='#1e7449' onPress={() => navigate('LeagueListing')} title="League Listing" ></Button>
			</View>
		);
	}
}