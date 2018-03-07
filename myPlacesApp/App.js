import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PlaceList from './PlaceList';
import MapViewer from './MapViewer';

export default class App extends React.Component {

  render() {
    return <MyApp/>;
  }
}

const MyApp = StackNavigator({
  Home: {screen: PlaceList},
  MapViewer: {screen: MapViewer}
});
