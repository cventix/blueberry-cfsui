import React, { FunctionComponent } from 'react'

// ui-elements
import { VMGrid } from '../../VMGrid/VMGrid'

export default interface Iprops {}

export const VMContentBody: React.FunctionComponent<Iprops> = () => { return(<VMGrid />)}
