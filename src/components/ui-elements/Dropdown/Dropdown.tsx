import * as React from "react";

import DropdownItem from "./DropdownItem";

import styles from "./Dropdown.module.scss";

interface Iprops {
  isOpen: boolean;
  handleChange?: any;
}

export const Dropdown = ({ isOpen, handleChange }: Iprops) => {
  return (
    <div className={styles.dropdownBox}>
      <button onClick={handleChange} className={styles.dpButton}>
        <div className={styles.more} />
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          <DropdownItem label={"one"} />
          <DropdownItem label={"two"} />
          <DropdownItem label={"three"} />
        </ul>
      )}
    </div>
  );
};

export default Dropdown;