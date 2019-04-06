import * as React from "react";

interface Iprops {
  text: string;
}

const Button: React.FunctionComponent<Iprops> = props => {
  return <button>{props.text}</button>;
};

export default Button;
