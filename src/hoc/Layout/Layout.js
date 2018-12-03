import React, { Component } from 'react';

import AuxComp from '../AuxComp/AuxComp';
import Dashboard from '../../components/Dashboard/Dashboard';

import classes from './Layout.css';

class Layout extends Component {
    render() {
        return(
            <AuxComp>
                <Dashboard />
                <main className={classes.Main}>
                    {this.props.children}
                </main>
            </AuxComp>
        )
    }
};

export default Layout;