import * as React from "react";

interface Iprops {
  label: string;
  link?: string;
}

export const DropdownItem = ({ label, link }: Iprops) => {
  return (
    <li>
      <a href={link}>{label} </a>
    </li>
  );
};

export default DropdownItem;
