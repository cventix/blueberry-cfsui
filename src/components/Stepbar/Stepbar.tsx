import * as React from 'react'

// styles
import styles from './Stepbar.module.scss'

export default interface Iprops {
  steps: string[]
  currentStep: number
}

const renderSteps = (steps: string[], currentStep: number) => {
  return steps.map((stepTitle, index) => {
    let stepClassName = ''
    currentStep = currentStep || 0

    if (index < currentStep) stepClassName = `${styles.completed}`

    if (index === currentStep) stepClassName = `${styles.current}`

    return (
      <li className={`${styles.step} ${stepClassName}`} key={index}>
        <a className={styles.item}>
          <span className={styles.circle} />
          <span className={styles.caption}>{stepTitle}</span>
        </a>
      </li>
    )
  })
}

export const Stepbar = ({ steps, currentStep }: Iprops) => (
  <div className={styles.stepbar}>
    <ul className={styles.stepsWrapper}>{renderSteps(steps, currentStep)}</ul>
  </div>
)
