import React from "react";
import styles from "./Progressbar.module.scss";

export default interface Iprops {
  value: number;
  error?: boolean;
  width?: number;
  height?: number;
  color?: string;
}

export const Progressbar: React.FunctionComponent<Iprops> = ({
  value,
  error = false,
  width,
  height,
  color
}) => (
  <div className={styles.progressContainer}>
    <progress
      value={value}
      max={100}
      style={{ width: width, height: height }}
      className={
        color
          ? styles[color]
          : error
          ? styles.red
          : value === 100
          ? styles.green
          : styles.yellow
      }
    />
  </div>
);
