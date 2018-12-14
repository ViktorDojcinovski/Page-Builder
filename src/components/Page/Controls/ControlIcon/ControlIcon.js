import React, { Component } from 'react';

import classes from './ControlIcon.css';
import FAIcon from '../../../UI/FontAwesome/FAIcon';

class ControlIcon extends Component {
    
    onDragStart = (event) => {
        event.dataTransfer.setData("type", this.props.type)
    }

    render() {

        const el_classes = [classes.ControlIcon, classes[this.props.label]];

        return (
            <div 
                className={el_classes.join(' ')} 
                draggable
                onClick={this.props.clicked}
                onDragStart={(e) => this.onDragStart(e)}>
                    <FAIcon icon={this.props.icon} />
                    {this.props.label}
            </div>
        )
    }
}

export default ControlIcon;