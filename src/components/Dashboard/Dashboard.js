import React from 'react';

import classes from './Dashboard.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Avatar from '../UI/Avatar/Avatar';

const dashboard = (props) => {
    return(
        <div className={classes.Dashboard}>
            <div className={classes.Avatar}>
                <Avatar />
            </div>
            <nav>
                <h3 className={classes.NavHeader}>Page Admin Area</h3>
                <NavigationItems />
            </nav>
        </div>
    )
};

export default dashboard;