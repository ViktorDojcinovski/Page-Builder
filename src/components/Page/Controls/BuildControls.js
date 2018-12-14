import React from 'react';

import ControlIcon from './ControlIcon/ControlIcon';

import classes from './Controls.css';

const components = [
    {
        label:  'Header', 
        icon:   'heading',
        type:   'header',
    },
    {
        label:  'Footer', 
        icon:   'code',
        type:   'footer',
    },
    {
        label:  'Image', 
        icon:   'image',
        type:   'image',
    },
    {
        label:  'Text', 
        icon:   'font',
        type:   'text',
    }
]

const buildControls = (props) => {
    return(
        <div className={classes.Controls}>
            {components.map((comp) => {
                return <ControlIcon
                            key={comp.label}
                            label={comp.label}
                            icon={comp.icon}
                            type={comp.type} />
            })}
        </div>
    )
};

export default buildControls;