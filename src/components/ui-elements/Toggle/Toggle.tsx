import React from "react";
import styles from "./Toggle.module.scss";

interface Iprops {
  checked: boolean;
  disabled?: boolean;
  onToggle?: (e: boolean) => void;
  className?: string;
}
const Toggle: React.SFC<Iprops> = ({
  checked,
  disabled,
  onToggle,
  className
}) => (
  <div
    className={className && styles[className]}
    {...onToggle && { onClick: () => onToggle(checked) }}
  >
    <label className={disabled ? styles.gray : styles.switch}>
      <input type="checkbox" defaultChecked={checked} />
      <span className={styles.knob} />
    </label>
  </div>
);
export default Toggle;
