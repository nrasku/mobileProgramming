import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import  { MapView, Constants, Location, Permissions } from 'expo';

const GLOBAL = require("./Globals");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', marker: { latitude: "60.201373", longitude: "24.934041", name: "Haaga-Helia"  },
                    mapRegion: { latitude: 60.201373, longitude: 24.934041, latitudeDelta: 0.03, longitudeDelta: 0.03}
                  };

  }

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ 
        marker: {
          latitude: location["coords"]["latitude"],
          longitude: location["coords"]["longitude"],
          name: "Dis You"
        }
      });
    }
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  getCoordinates = () => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + '&key=' + GLOBAL.API_KEY;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setMarker(responseJson);
      })
      .catch((error) => { 
        console.error(error); 
        Alert.alert("An error has occured while locating the address");
      });    
  }

  setMarker = (json) => {
    try {
      if (json.results.length == 0) {
        Alert.alert("No results found. Check the address");
      } else {
        let location = json.results[0].geometry.location;
        this.setState({
          marker: { latitude: location.lat,
                          longitude: location.lng,
                          name: json.results[0].formatted_address },
          mapRegion: { latitude: location.lat, longitude: location.lng, latitudeDelta: 0.03, longitudeDelta: 0.03 }
        });
      }
    } catch(err) {
      Alert.alert("An error has occured");
      console.error(err);
    }
  }

  moveToMarker = () => {
    var {mapRegion} = this.state;
    let duration = 500;
    console.log(this.state.mapRegion);
    mapRegion.timing({
        latitude: parseFloat(this.state.marker["latitude"]),
        longitude: parseFloat(this.state.marker["longitude"]),
        duration
    }).start();
  }



  render() {
    console.log(this.state.mapRegion);
    return (
      <View style={{ flex: 1, position: 'relative' }} >
        <MapView style={{ flex:1 }}
          region={this.state.mapRegion}
          initialRegion={{ 
            latitude: parseFloat(this.state.marker.latitude), 
            longitude: parseFloat(this.state.marker.longitude), 
            latitudeDelta: 0.03, 
            longitudeDelta: 0.03 }}
          onRegionChangeComplete={this._handleMapRegionChange.bind(this)}>
            <MapView.Marker
              coordinate={{latitude: parseFloat(this.state.marker["latitude"]), 
              longitude: parseFloat(this.state.marker["longitude"]) }}
              title={this.state.marker["name"]}>
                <MapView.Callout>
                  <View>
                    <Text style={{width: 300, borderColor: 'lightgray',
                      borderWidth: 1, margin: 5}}>{this.state.marker["name"]}</Text>
                  </View>
                </MapView.Callout>
            </MapView.Marker>
            
          </MapView>
          <TextInput style={{width: 200, borderColor: 'lightgray',
                    borderWidth: 1, margin: 5}} onChangeText={(address) => this.setState({address: address})} 
                    value={this.state.address} />
          <Button style={{width: 100}} onPress={this.getCoordinates} title="Find"/>
      </View>

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
});
