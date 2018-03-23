import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import LeagueListing from './LeagueListing';
import LeagueTable from './LeagueTable';
import TeamStatistics from './TeamStatistics';
import MatchInformation from './MatchInformation';

export default class App extends React.Component {
  render() {
    return <MyApp/>;
  }
}

const MyApp = StackNavigator({
  Home: {screen: Home},
  LeagueListing: {screen: LeagueListing},
  LeagueTable: {screen: LeagueTable},
  TeamStatistics: {screen: TeamStatistics},
  MatchInformation: {screen: MatchInformation}
});

