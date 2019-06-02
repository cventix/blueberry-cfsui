import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { t } from 'ttag'

// internal components
import { SelectOs } from './Steps/SelectOs'
import { ServiceDuration } from './Steps/ServiceDuration'
import { ChoosePlan } from './Steps/ChoosePlan'
import { ChooseNetworkCard } from './Steps/ChooseNetworkCard'
import { FinalStep } from './Steps/FinalStep'
import { DailySetting } from './Steps/DailySetting'
import { VMDetailsShh } from '../VMDetails/VMDetailsShh'
import { VMDetailsSetting } from '../VMDetails/VMDetailsSetting'
import { VMDetailsUpgrade } from '../VMDetails/VMDetailsUpgrade'
import { VMContentHeader } from '../VMContentHeader'

// styles
import styles from './Order.module.scss'

export default class Order extends React.Component<any, any> {

    // handle search
    onChangeSearchInput = (val: string) => {
        console.log(val);
    }

    render() {
        const { match } = this.props;
        console.log(this.props.location);

        const history = [{ title: t`لیست سرورها`, link: '/vm', active: false }]
        if (this.props.location.pathname !== '/vm')
            history.push({ title: this.props.location.pathname.split('/'), link: this.props.location.pathname, active: true })
        
        return (
            <React.Fragment>
                <VMContentHeader history={history} handleSearchInput={(e: any) => this.onChangeSearchInput(e)} className={styles.oredrHeader}/>
                    <Router>
                        <Switch location={this.props.location}>
                            <Route
                                exact
                                path={`${match.path}/`}
                                component={SelectOs}
                            />
                            <Route
                                path={`${match.path}/serviceDuration`}
                                component={ServiceDuration}
                            />
                            <Route
                                path={`${match.path}/choosePlan`}
                                component={ChoosePlan}
                            />
                            <Route
                                path={`${match.path}/chooseNetwork`}
                                component={ChooseNetworkCard}
                            />
                            <Route
                                
                                path={`${match.path}/finalStep`}
                                component={FinalStep}
                            />
                        </Switch>
                    </Router>
            </React.Fragment>
        );
    }
}