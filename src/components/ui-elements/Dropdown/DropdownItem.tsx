import * as React from "react";

interface Iprops {
  label: string;
  link?: string;
  onSelect?: any;
  index?: number;
}

export const DropdownItem = ({ label, link, onSelect, index }: Iprops) => {
  return (
    <li onClick={() => onSelect(index)}>
      <a href={link}>{label} </a>
    </li>
  );
};

export default DropdownItem;
