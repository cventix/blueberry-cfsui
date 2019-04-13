import * as React from "react";

import DropdownItem from "./DropdownItem";

import styles from "./Dropdown.module.scss";

interface Iprops {
  isOpen: boolean;
  onToggle?: () => void;
  data?: string[];
  onSelect?: (e: string) => void;
}

export const Dropdown: React.SFC<Iprops> = ({
  data,
  onSelect,
  isOpen,
  onToggle
}) => {
  return (
    <div className={styles.dropdownBox}>
      <button onClick={onToggle} className={styles.dpButton}>
        <div className={styles.more} />
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {data &&
            data.map((item: any, i: number) => {
              return (
                <DropdownItem label={item} onSelect={onSelect} index={i} key={i}/>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
