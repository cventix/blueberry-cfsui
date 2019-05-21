import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { t } from 'ttag'

// internal components
import { VMContentHeader } from '../VMContentHeader'
import { SelectOs } from './Steps/SelectOs'
import { ServiceDuration } from './Steps/ServiceDuration'

// styles
import styles from './Order.module.scss'


export default class Order extends React.Component<any, any> {

    // handle search
    onChangeSearchInput = (val: string) => {
        console.log(val);
    }

    render() {
        const { match } = this.props;
        const history = [{ title: t`لیست سرورها`, link: '/vm', active: false }]
        if (this.props.location.pathname !== '/vm')
            history.push({ title: this.props.location.pathname.split('/'), link: this.props.location.pathname, active: true })
        return (
            <React.Fragment>
                <VMContentHeader history={history} handleSearchInput={(e: any) => this.onChangeSearchInput(e)} className={styles.oredrHeader}/>
                    <Switch location={this.props.location}>
                        <Route 
                            exact
                            path={`${match.path}`}
                            component={SelectOs}
                        />
                        <Route 
                            exact
                            path={`${match.path}/service-duration`}
                            component={ServiceDuration}
                        />
                    </Switch>
            </React.Fragment>
        );
    }
}