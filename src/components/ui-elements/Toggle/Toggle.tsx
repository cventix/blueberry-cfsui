import React from "react";
import styles from "./Toggle.module.scss";

interface Iprops {
  checked: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}
const Toggle: React.SFC<Iprops> = ({ checked, disabled, onToggle }) => (
  <label className={disabled ? styles.gray : styles.switch}>
    <input type="checkbox" checked={checked} />
    <span className={styles.knob} />
  </label>
);
export default Toggle;
