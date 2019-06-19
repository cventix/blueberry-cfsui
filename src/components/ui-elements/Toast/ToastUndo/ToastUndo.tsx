import React, { useState, useEffect } from 'react'

//styles
import styles from './ToastUndo.module.scss'
import { CircularProgressBar } from './CountDown'

export interface Iprops {
  id?: number
  undo?: any
  closeToast?: any
  msg?: string
}

export const ToastUndo = ({ id, undo, closeToast ,msg= 'فایل مورد نظر حذف شد'}: Iprops) => {
  function handleClick() {
    undo(id)
    closeToast()
  }
  const [currentCount, setCount] = useState(10)
  const timer = () => setCount(currentCount - 1)

  useEffect(() => {
    if (currentCount <= 0) {
      return
    }
    const id = setInterval(timer, 1000)
    return () => clearInterval(id)
  }, [currentCount])
  
  return (
    <div>
      <h4 className={styles.undo}>
        <CircularProgressBar strokeWidth="1" sqSize="20" percentage={currentCount} />
        {msg}
        <button className={styles.undoButton} onClick={handleClick}>
          UNDO
        </button>
      </h4>
    </div>
  )
}
