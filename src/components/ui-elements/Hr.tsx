import * as React from "react";

export default interface Iprops {
	style?: object;
}

export const Hr = ({ style }: Iprops) => ( <div className="hr" style={style}></div> );

