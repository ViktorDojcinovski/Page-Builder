import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './CloseBtn.css';

const closeIcon = (props) => (
  <div className={classes.CloseBtn} onClick={props.clicked}>
    <FontAwesomeIcon icon="window-close" />
  </div>
)

export default closeIcon;