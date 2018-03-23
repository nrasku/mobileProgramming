import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import SVGImage from 'react-native-svg-image';


const GLOBAL = require('./Globals');

export default class LeagueTable extends React.Component {

	static navigationOptions = {title: 'League Table'};

	constructor(props) {
		super(props);
		this.state = {teams: [{}]};
	}

	componentDidMount = () => {
		let league = this.props.navigation.state.params.leagueId;
		let url = 'http://api.football-data.org/v1/competitions/' + league + '/leagueTable';
		console.log(url);
		fetch(url, {
			headers: {
				"X-Auth-Token": GLOBAL.API_KEY
			}
		})
	      .then((response) => response.json())
	      .then((responseJson) => { 
	        this.setState({
	        	teams: responseJson.standing
	        });
	      })
	      .catch((error) => { 
	        console.error(error); 
	        Alert.alert("An error has occured while locating the address");
	      });    
	}

	svgRender = (uri, w, h) => {
		return <SVGImage source={{uri: uri}} style={{ width: w, height: h }} />
	}

	tableData = (team) => {
		let games = team.playedGames;
		let points = team.points;
		let wins = team.wins;
		let draws = team.draws;
		let losses = team.losses;

		return [games, wins, draws, losses, points]
	}

	render() {
		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state
		return( 
			<ScrollView>
				<View style={params.styles.container}>
					<List containerStyle={{width: '100%'}}>
						<ListItem
							avatar={params.leagueLogo}
							title="Current Standings"
							
						/>
						{this.state.teams.map((team, index) => (
							<ListItem
								key={index} 
		                		title={team.position + ' - ' + team.teamName}
		                		avatar={this.svgRender(team.crestURI, 40, 40)}
		                		rightTitle={'stats'}
		                		onPress = {() => navigate('TeamStatistics', {styles: params.styles, 
	                                                                    teamId: team._links.team.href,
	                                                                	teamName: team.teamName,
	                                                                	teamLogo: this.svgRender(team.crestURI, 60, 60),
	                                                                	tableData: this.tableData(team)})}
							/>
						))}
					</List>
				</View>
			</ScrollView>
		);
	}
}