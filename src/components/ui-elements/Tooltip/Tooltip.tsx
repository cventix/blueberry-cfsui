import * as React from "react";

interface Iprops {
  text: string;
}

const Tooltip: React.FunctionComponent<Iprops> = props => {
  return <div>{props.text}</div>;
};

export default Tooltip;
