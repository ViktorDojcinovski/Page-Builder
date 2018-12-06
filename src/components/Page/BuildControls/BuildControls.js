import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import ImageIcon from '../../UI/FontAwesome/ImageIcon';
import FooterIcon from '../../UI/FontAwesome/FooterIcon';
import HeaderIcon from '../../UI/FontAwesome/HeaderIcon';
import TextIcon from '../../UI/FontAwesome/TextIcon';

import classes from './BuildControls.css';

const components = [
    {
        label: 'Header', 
        icon: <HeaderIcon />,
        type: 'header',
    },
    {
        label: 'Footer', 
        icon: <FooterIcon />,
        type: 'footer',
    },
    {
        label: 'Image', 
        icon: <ImageIcon />,
        type: 'image',
    },
    {
        label: 'Text', 
        icon: <TextIcon />,
        type: 'text',
    },
]

const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            {components.map((comp) => {
                return <BuildControl
                            key={comp.label}
                            label={comp.label}
                            icon={comp.icon}
                            type={comp.type} />
            })}
        </div>
    )
};

export default buildControls;