import React from "react";
import styles from "./Rangebar.module.scss";

export default interface Iprops {
  value?: number;
  width?: number;
  updateRange?: void;
}

export const RangeBar: React.SFC<Iprops> = ({ value, width, updateRange }) => (
  <div className={styles.styled_range}>
    <input
      type="range"
      className={styles.track_range}
      style={{ width: width }}
      value={value}
    />
    <input
      type="range"
      className={styles.thumb_range}
      style={{ width: width }}
      value={value}
    />
  </div>
);
