import React, { Component } from 'react'

export interface Iprops {
  id?: any
  undo?: any
  closeToast?: any
}

export const ToastUndo = ({ id, undo, closeToast }: Iprops) => {
  function handleClick() {
    undo(id)
    closeToast()
  }

  return (
    <div>
      <h3>
        Row Deleted <button onClick={handleClick}>UNDO</button>
      </h3>
    </div>
  )
}
