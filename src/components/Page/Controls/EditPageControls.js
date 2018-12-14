import React from 'react';

import ControlIcon from './ControlIcon/ControlIcon';

import classes from './Controls.css';

const components = [
    {
        label:  'Trash',
        icon:   'trash',
        type:   'trash',
    },
    {
        label:  'Edit',
        icon:   'edit',
        type:   'edit',
    }
]

const editControls = (props) => {
    return(
        <div className={classes.EditControls}>
            {components.map((comp) => {
                return <ControlIcon
                            key={comp.label}
                            label={comp.label}
                            icon={comp.icon}
                            type={comp.type}
                            clicked={(comp.type === 'edit') ? props.editHandler : props.deleteHandler} />
            })}
        </div>
    )
};

export default editControls;