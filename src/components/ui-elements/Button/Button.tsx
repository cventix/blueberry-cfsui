import * as React from 'react'

// styles
import styles from './Button.module.scss'

export default interface Iprops {
<<<<<<< HEAD
  className?: object
  onClick?: any
  style?: object
  children?: any
}

const classCreator = (className: any) => {
  return className.map((name: any) => styles[name]).join(' ')
}
=======
  className?: object;
  onClick?: () => void;
  style?: object;
  children?: any;
}

const classCreator = (className: any) => {
  return className.map((name: any) => styles[name]).join(" ");
};
>>>>>>> 8927f9658fb209b4e10bd360cc0bdbbdf41f45bf

export const Button: React.FunctionComponent<Iprops> = props => {
  return (
    <button
<<<<<<< HEAD
      className={props.className ? `${styles.btn} ${classCreator(props.className)}` : `${styles.btn}`}
      onClick={props.onClick}
=======
      className={
        props.className
          ? `${styles.btn} ${classCreator(props.className)}`
          : `${styles.btn}`
      }
      onClick={() => props.onClick}
>>>>>>> 8927f9658fb209b4e10bd360cc0bdbbdf41f45bf
      style={props.style}
    >
      {props.children}
    </button>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 8927f9658fb209b4e10bd360cc0bdbbdf41f45bf
