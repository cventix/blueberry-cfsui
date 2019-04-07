import React from "react";
import styles from "./Rangebar.module.scss";
const RangeBar = ({value,updateRange}:any) => (
  <div className={styles.styled_range}>
      <input type="range" className={styles.track_range} value={value}/>
      <input type="range" className={styles.thumb_range} value={value}/>
  </div>
);

export default RangeBar;
