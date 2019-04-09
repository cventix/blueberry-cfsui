import * as React from "react";

interface Iprops {
	src: string;
	alt: string;
	className: string;
}

const HLink = ({ src, ...props }: Iprops) => (
	<img 
	{...props}
	src={src} 
	/>
)

export default HLink;

