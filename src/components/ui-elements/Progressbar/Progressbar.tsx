import * as React from "react";

interface Iprops {
  text: string;
}

const Progressbar: React.FunctionComponent<Iprops> = props => {
  return <div>{props.text}</div>;
};

export default Progressbar;
