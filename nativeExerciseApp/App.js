import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Calculator from './Calculator';
import GuessingGame from './GuessingGame';
import HomeScreen from './HomeScreen';
import ShoppingList from './ShoppingList';
import CalculationHistory from './CalculationHistory';

export default class App extends React.Component {

  render() {
    return <MyApp/>;
  }
}

const MyApp = StackNavigator({
  Home: {screen: HomeScreen},
  Calculator: {screen: Calculator}, 
  GuessingGame: {screen: GuessingGame},
  ShoppingList: {screen: ShoppingList},
  CalculationHistory: { screen: CalculationHistory }
});
