import React, { Component } from 'react';

import classes from './BuildControl.css';

class BuildControl extends Component {
    
    onDragStart = (event) => {
        console.log('dragging started');
        event.dataTransfer.setData("type", this.props.type)
    }

    render() {

        const el_classes = [classes.BuildControl, classes[this.props.label]];

        return(
            <div 
                className={el_classes.join(' ')} 
                draggable
                onDragStart={(e) => this.onDragStart(e)}>
                    {this.props.icon}
                    {this.props.label}
            </div>
        )
    }
}

export default BuildControl;