import React from 'react';
import { FlatList, View, Text } from 'react-native';


export default class CalculationHistory extends React.Component {

	constructor(props) {
		super(props);

	}

	static navigationOptions = {title: 'History'};

	render() {
		const { params } = this.props.navigation.state;
		return ( 
			<View style={params.styles.container}>
				<FlatList data={params.history} renderItem={({item}) => <Text>{item.key}</Text>}/>
			</View>
		);
	}
}