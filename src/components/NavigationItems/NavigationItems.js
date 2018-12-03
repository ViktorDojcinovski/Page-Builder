import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Create New Page</NavigationItem>
        <NavigationItem link="/orders">View Your Pages</NavigationItem>
    </ul>
);

export default navigationItems;