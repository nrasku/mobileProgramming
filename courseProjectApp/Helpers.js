import React from 'react';
import SVGImage from 'react-native-svg-image';

export function svgRender(uri, w, h) {
	console.log(uri);

	image = uri ? <SVGImage source={{uri: uri}} style={{ width: w, height: h }} onError={this.renderDefault.bind(this)}/> : 
				  <SVGImage source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}} 
				  style={{ width: w, height: h }} />;
	
	return image;
}

renderDefault = () => {
	
}