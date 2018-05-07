import React from 'react';
import { View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const GLOBAL = require("../Globals");

export default class TeamStatistics extends React.Component {

	static navigationOptions = {title: 'Team Statistics'};

	constructor(props) {
		super(props);
		this.state = {fixtures: {}, form: []};
	}

	componentDidMount = () => {
		let team = this.props.navigation.state.params.teamId;
		team = team.split("/");
		let teamId = team[team.length - 1];
		let url = 'http://api.football-data.org/v1/teams/' +  teamId + '/fixtures/';
		fetch(url, {
			headers: {
				"X-Auth-Token": GLOBAL.API_KEY
			}
		})
	      .then((response) => response.json())
	      .then((responseJson) => { 
	        this.setState({
	        	fixtures: responseJson.fixtures
	        });
	        this.formGuide();
	      })
	      .catch((error) => { 
	      	Alert.alert("An error has occured while locating the statistics");
	        console.error(error);
	      });
	}

	formGuide = () => {
		finishedGames = this.state.fixtures.filter(function(fix) { 
	        return fix.status === 'FINISHED' 
	    })
	    if (finishedGames.length !== 0) {
			let length = finishedGames.length;
			fn = length > 5 ? finishedGames.slice(length - 5, length) : finishedGames;
			let form = []
			let clubName = this.props.navigation.state.params.teamName;
			fn.forEach((game) => {
				var result = this.identifyTeam(game, clubName);
				result.push(game)
				form.push(result);
			})
			this.setState({
				form: form
			});
		} else {
			return [];
		}
	}

	identifyTeam = (game, clubName) => {
		let curClubGoals = 0;
		let otherClubGoals = 0;
		let home = null;
		if (clubName == game.homeTeamName) {
			curClubGoals = game.result.goalsHomeTeam
			otherClubGoals = game.result.goalsAwayTeam
			home = true;
			return this.result(curClubGoals, otherClubGoals, home)
		} else {
			curClubGoals = game.result.goalsAwayTeam
			otherClubGoals = game.result.goalsHomeTeam
			home = false;
			return this.result(otherClubGoals, curClubGoals, home)
		}
	}

	result = (homeGoals, awayGoals, home) => {
		if (homeGoals == awayGoals) {
			return ["D", "yellow"];
		} else if (home){
			return homeGoals > awayGoals ? ["W", "green"] : ["L", "red"];
		} else {
			return homeGoals < awayGoals ? ["W", "green"] : ["L", "red"];
		}	
	}



	render() {
		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state
		
		const tableHead = ['Played', 'W', 'D', 'L', 'Pts'];
		const tableData = [params.tableData];
		return( 
			<View style={params.styles.container}>
				<View style={{height: 80}}>
					{params.teamLogo}
				</View>
				<Text>{params.teamName}</Text>
				<View style={{width: 300, height: 50, marginTop: 30}}>
					<Table style={{ marginBottom: 30 }}>
			          <Row data={tableHead} style={params.styles.head} textStyle={params.styles.text}/>
			          <Rows data={tableData} style={params.styles.row} textStyle={params.styles.text}/>
			        </Table>
			        <View style={params.styles.formBox}>
			        	{this.state.form.map((fix, index) => (
			        		<View key={index} style={{justifyContent: 'center', alignItems: 'center',
			        								  width: 40, height: 40, backgroundColor: fix[1]}}>
							  <TouchableOpacity onPress = {() => navigate('MatchInformation', {styles: params.styles, 
                                               	game: fix[2]})}>
			        			<Text>{fix[0]}</Text>
	        				  </TouchableOpacity>
		        			</View>
			        	))}
		        	</View>
		        </View>
			</View>
		);
	}
}