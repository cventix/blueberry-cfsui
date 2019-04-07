import React from "react";
import styles from "./Progressbar.module.scss";

interface Pprops {
  value: number;
  error?: boolean;
}

const Progressbar = ({ value, error = false, ...props }: Pprops) => (
  <div className={styles.progressContainer}>
    <progress
      value={value}
      max={100}
      className={
        error ? styles.red : value === 100 ? styles.green : styles.yellow
      }
    />
  </div>
);

export default Progressbar;
