import React from 'react';
import SVGImage from 'react-native-svg-image';

export function svgRender(uri, w, h) {
		return <SVGImage source={{uri: uri}} style={{ width: w, height: h }} />
}