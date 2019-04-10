import * as React from "react";

export default interface Iprops {
	backgroundColor?: string;
	width?: string;
	height?: string;
}

export const Hr = ({ backgroundColor = '#f2f2f2', width = '100%', height = '2px'}: Iprops) => ( 
	<div className="hr" style={{backgroundColor: backgroundColor, width: width, height: height}}></div> 
);

