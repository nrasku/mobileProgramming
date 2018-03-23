import React from 'react';
import { View, Image, Text, Alert } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { svgRender } from './Helpers';

const GLOBAL = require("./Globals");

export default class MatchInformation extends React.Component {

	static navigationOptions = {title: 'Match Information'};

	constructor(props) {
		super(props);
		this.state = {homeTeam: {}, awayTeam: {}, competition: {}}
	}

	componentDidMount = () => {
		let game = this.props.navigation.state.params.game._links
		let homeTeamUrl = game.homeTeam.href;
		let awayTeamUrl = game.awayTeam.href;
		let competitionUrl = game.competition.href;

		fetch(homeTeamUrl, {
			headers: {
				"X-Auth-Token": GLOBAL.API_KEY
			}
		})
	      .then((response) => response.json()).then((responseJson) => { 
	        this.setState({
	        	homeTeam: responseJson
	        });
	      }).then(() => {
	      	fetch(awayTeamUrl, {
	      		headers: {
	      			"X-Auth-Token": GLOBAL.API_KEY
	      		}
	      	}).then((response) => response.json()).then((responseJson) => {
	      		this.setState({
	      			awayTeam: responseJson
	      		})
	      	})
	      }).then(() => {
	      	fetch(competitionUrl, {
	      		headers: {
	      			"X-Auth-Token": GLOBAL.API_KEY
	      		}
	      	}).then((response) => response.json()).then((responseJson) => {
	      		this.setState({
	      			competition: responseJson
	      		})
	      	})
	      })
	      .catch((error) => { 
	        console.error(error); 
	        Alert.alert("An error has occured while locating the statistics");
	      });
	}

	render() {
		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state

		const headers = ['Date', 'Time', 'Competition', 'Match Day'];
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		const dateTime = new Date(params.game.date)
		const details = [dateTime.toLocaleDateString('en-EN', options),
						 dateTime.toLocaleTimeString('en-EN'), this.state.competition.caption,
						 params.game.matchday ];

		return(
			<View style={params.styles.container}>
				{headers.map((header, index) => (
					<View key={index} style={{alignItems: 'center', justifyContent: 'center',}}>
						<Text style={{fontWeight: '600'}}>{header}</Text>
						<Text>{details[index]}</Text>
					</View>
				))}
				<View style={params.styles.matchSpecifics}>
					<View style={{height: 150, paddingRight: 80,
								alignItems: 'center', justifyContent: 'center'}}>
						<View style={{alignItems: 'center', justifyContent: 'center'}}>
							<Text style={{fontWeight: '600'}}>
								{this.state.homeTeam.shortName}
							</Text>
						</View>	
							{svgRender(this.state.homeTeam.crestUrl, 70, 80)}
						<View style={{alignItems: 'center', justifyContent: 'center'}}>
							<Text style={{fontWeight: '600', fontSize: 20}}>
								{params.game.result.goalsHomeTeam}
							</Text>
						</View>
					</View>
					<View style={{height: 150, alignItems: 'center', justifyContent: 'center'}}>
						<View style={{alignItems: 'center', justifyContent: 'center'}}>
							<Text style={{fontWeight: '600'}}>
								{this.state.awayTeam.shortName}
							</Text>
						</View>
							{svgRender(this.state.awayTeam.crestUrl, 70, 80)}
						<View style={{alignItems: 'center', justifyContent: 'center'}}>
							<Text style={{fontWeight: '600', fontSize: 20}}>
								{params.game.result.goalsAwayTeam}
							</Text>
						</View>
					</View>
				</View>
			</View>

		);
	}
}