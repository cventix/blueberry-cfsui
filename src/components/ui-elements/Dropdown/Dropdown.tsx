import * as React from "react";

interface Iprops {
  text: string;
}

const Dropdown: React.FunctionComponent<Iprops> = props => {
  return <div>{props.text}</div>;
};

export default Dropdown;
