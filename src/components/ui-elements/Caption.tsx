import React from 'react';

export default interface Iprops {
	color?: string
	fontFamily?: string
	fontSize?: string
	label?: string
}

export const Caption = ({ color= '#4a4a4a', fontFamily='vazir-regular', fontSize='14px', label }: Iprops) => (
	<span className="caption" style={{ color: color, fontFamily: fontFamily, fontSize: fontSize}}>
		{label}
	</span>
)