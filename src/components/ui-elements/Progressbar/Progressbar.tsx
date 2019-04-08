import React from "react";
import styles from "./Progressbar.module.scss";
import { any } from "prop-types";

 interface Iprops {
  value: number;
  error?: boolean;
  width?:number;
}

const Progressbar = ({ value, error = false,width, ...props }: Iprops) => (
  <div className={styles.progressContainer}>
    <progress
      value={value}
      max={100}
      style={{width:width}}
      className={
        error ? styles.red : value === 100 ? styles.green : styles.yellow
      }
    />
  </div>
);

export default {Progressbar,Iprops:any};
