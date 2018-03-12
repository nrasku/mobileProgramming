import React from 'react';
import { Alert } from 'react-native';
import  { MapView, Constants, Location, Permissions } from 'expo';

const GLOBAL = require("./Globals");

export default class MapViewer extends React.Component {

	static navigationOptions = {title: 'Map'};

	constructor(props) {
		super(props);
		this.state={
			 marker: { latitude: "60.1718729", longitude: "24.9414217", name: "Kaivokatu 1, 00100 Helsinki, Finland"  }
		}
	}

	componentDidMount = () => {
		this.getLocation();
	}

	getLocation = () => {
		let address = this.props.navigation.state.params.address
		const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + GLOBAL.API_KEY;
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
	                          name: json.results[0].formatted_address }
	        });
	      }
	    } catch(err) {
	      Alert.alert("An error has occured");
	      console.error(err);
	    }
  }

	render() {
		return (
			<MapView style={{ flex: 1, position: 'relative' }}
				initialRegion={{ 
		            latitude: parseFloat(this.state.marker.latitude), 
		            longitude: parseFloat(this.state.marker.longitude), 
		            latitudeDelta: 0.03, 
		            longitudeDelta: 0.03 }}
	            region={{
	            	latitude: parseFloat(this.state.marker.latitude), 
		            longitude: parseFloat(this.state.marker.longitude), 
		            latitudeDelta: 0.03, 
		            longitudeDelta: 0.03
	            }}>
            	<MapView.Marker coordinate={{latitude: parseFloat(this.state.marker.latitude), 
                         					longitude: parseFloat(this.state.marker.longitude)}}
                				title={this.state.marker.name}	>
            	</MapView.Marker>
            </MapView>

		);
	}
}