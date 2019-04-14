import React from 'react'
import styles from './Progressbar.module.scss'

export default interface Iprops {
<<<<<<< HEAD
  value: number
  error?: boolean
  width?: number
}

export const Progressbar: React.FunctionComponent<Iprops> = ({ value, error = false, width, ...props }) => (
  <div className={styles.progressContainer}>
    <progress value={value} max={100} style={{ width: width }} className={error ? styles.red : value === 100 ? styles.green : styles.yellow} />
=======
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
>>>>>>> 8927f9658fb209b4e10bd360cc0bdbbdf41f45bf
  </div>
)
