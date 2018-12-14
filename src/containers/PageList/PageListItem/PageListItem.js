import React from 'react';

import classes from './PageListItem.css'

import EditPageControls from '../../../components/Page/Controls/EditPageControls';

const pageListItem = (props) => {
    return(
        <div className={classes.PageListItem}>
            <div className={classes.ListItemName}>{props.name}</div>
            <div className={classes.PageListControls}>
                <EditPageControls 
                    deleteHandler={props.deletePage}
                    editHandler={props.editPage} />
            </div>
        </div>
    )
};

export default pageListItem; 