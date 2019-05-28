import * as React from 'react'

// styles
import styles from './Comment.module.scss'
import { Avatar } from '../ui-elements/Avatar'

export const Comment: React.FunctionComponent<any> = props => {
  return (
    <div className={styles.commentBox}>
      <div className={styles.commentHeader}>
        <div className={styles.right}>
          <div className={styles.avatar}>
            <Avatar />
          </div>
          <div className={styles.column}>
            <div> {props.user}</div>
            <div  className={styles.littleSize}> {props.comment}</div>
          </div>
        </div>
        <div className={styles.littleSize}>remove</div>
      </div>
      <div className={styles.commentBody} >
          {props.details}
          </div>
    </div>
  )
}
