import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { t } from 'ttag'

// internal components
import SelectOs from './Steps/SelectOs'
import ServiceDuration from './Steps/ServiceDuration'
import ChoosePlan from './Steps/ChoosePlan'
import ChooseNetworkCard from './Steps/ChooseNetworkCard'
import FinalStep from './Steps/FinalStep'
import { DailySetting } from './Steps/DailySetting'
import { VMDetailsShh } from '../VMDetails/VMDetailsShh'
import { VMDetailsSetting } from '../VMDetails/VMDetailsSetting'
import { VMDetailsUpgrade } from '../VMDetails/VMDetailsUpgrade'
import { VMGrid } from '../../../VMGrid/VMGrid'
import { VMContentHeader } from '../VMContentHeader'

// styles
import styles from './Order.module.scss'

export default class Order extends React.Component<any, any> {
  // handle search
  onChangeSearchInput = (val: string) => {
    //console.log(val);
  }

  render() {
    const { match } = this.props

    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path={`${match.path}/serviceDuration`} component={ServiceDuration} />
            <Route path={`${match.path}/choosePlan`} component={ChoosePlan} />
            <Route path={`${match.path}/chooseNetwork`} component={ChooseNetworkCard} />
            <Route path={`${match.path}/finalStep`} component={FinalStep} />
            <Route path={`${match.path}/`} component={SelectOs} />
            <Route component={VMGrid} />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}
