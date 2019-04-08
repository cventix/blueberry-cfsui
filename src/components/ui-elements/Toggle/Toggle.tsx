import React from "react";
import styles from "./Toggle.module.scss";

interface Toggle {
  checked: boolean;
  disabled?: boolean;
}
const Toggle = ({ checked, disabled }: Toggle) => (
  <label className={disabled ? styles.gray : styles.switch}>
    <input type="checkbox" checked={checked} />
    <span className={styles.knob} />
  </label>
);
export default Toggle;
