import React from 'react';

import classes from './Avatar.css';
import image from '../../../assets/images/avatar.png';

const avatar = (props) => {
    return(
        <div className={classes.Avatar}>
            <img src={image} alt="Avatar" />
        </div>
    )
};

export default avatar;