import * as React from "react";

interface Iprops {
	src: string;
	alt: string;
	className: string;
}

const Icon = ({ src, ...props }: Iprops) => (
	<img 
	{...props}
	src={src} 
	/>
)

export default Icon;

