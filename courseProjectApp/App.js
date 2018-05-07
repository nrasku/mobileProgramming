import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import LeagueListing from './components/LeagueListing';
import LeagueTable from './components/LeagueTable';
import TeamStatistics from './components/TeamStatistics';
import MatchInformation from './components/MatchInformation';

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

