import * as React from "react";

export default interface Iprops {
	src: string;
	alt?: string;
	className?: string;
	style?: object;
}

export const Icon = ({ src, alt, className = "icon", style }: Iprops) => (
	<img
	src={src}
	alt={alt}
	className={className}
	style={style}
	/>
);

