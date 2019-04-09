import * as React from "react";

export default interface Iprops {
	src: string;
	alt?: string;
	className?: string;
}

export const Icon = ({ src, alt, className = "icon" }: Iprops) => (
	<img 
	src={src}
	alt={alt}
	className={className}
	/>
);

