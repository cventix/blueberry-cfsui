import * as React from 'react'

export default interface Iprops {
  children?: any
  className?: string
}

export const Footer: React.FunctionComponent<Iprops> = ({ children, className }) => <div className={className}>{children}</div>
