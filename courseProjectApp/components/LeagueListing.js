import React from 'react';
import {Alert, View, StyleSheet, ScrollView, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const GLOBAL = require("../Globals");

export default class LeagueListing extends React.Component {

	static navigationOptions = {title: 'League Listing'};

	constructor(props) {
		super(props);
		this.state = {leagues: [{}]};
	}

	componentDidMount = () => {
		let url = 'http://www.football-data.org/v1/competitions';
		fetch(url, {
			headers: {
				"X-Auth-Token": GLOBAL.API_KEY
			}
		})
	      .then((response) => response.json())
	      .then((responseJson) => { 
	        this.setState({
	        	leagues: responseJson
	        });
	      })
	      .catch((error) => { 
	      	Alert.alert("An error has occured while locating the address");
	        console.error(error); 
	      });    

	}

	getIcon = (league) => {
		return <Image source={GLOBAL.LOGOS[league]} 
				style={{ width: 40, height: 40 }} />
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<ScrollView>
				<View style={styles.container}>
					<List containerStyle={{width: '100%'}}>
						{this.state.leagues.map((league, index) => (
							<ListItem
								key={index} 
		                		title={league.caption}
		                		rightTitle={'league table'}
		                		avatar={this.getIcon(league.league)}
		                		onPress = {() => navigate('LeagueTable', {styles: styles, 
                                                                        leagueId: league.id,
                                                                    	leagueName: league.caption,
                                                                    	leagueLogo: this.getIcon(league.league)})}
							/>
						))}
					</List>
				</View>
			</ScrollView>
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
  contentContainer: {
    paddingVertical: 20
  },
  teamStatistics: {
  	flex: 1,
    backgroundColor: '#fff'
  },
  head: { 
  	height: 40, backgroundColor: '#f1f8ff' 
  },
  text: { 
  	marginLeft: 5 
  },
  row: { 
  	height: 30 
  },
  formBox: {
  	flex: 1, 
  	flexDirection: 'row',
  	alignItems: 'center',
    justifyContent: 'center',
  },
  matchSpecifics: {
  	flex: 1, 
  	flexDirection: 'row',
  	alignItems: 'center',
  	justifyContent: 'center',
  }
});