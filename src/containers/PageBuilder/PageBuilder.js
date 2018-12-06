import React, { Component } from 'react';

import AuxComp from '../../hoc/AuxComp/AuxComp';
import BuildControls from '../../components/Page/BuildControls/BuildControls';
import Page from '../../components/Page/Page';

import classes from './PageBuilder.css';

class PageBuilder extends Component {

    dragOver_classes = [classes.DragLeave];

    state = {
        html_elements: {
            'header': 0,
            'footer': 0,
            'image': 0,
            'text': 0,
        },
        dragging_over: false
    }

    onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.dragOver_classes = [classes.DragOver];
        this.setState({dragging_over: true});
    }

    onDragLeave = (event) => {
        this.dragOver_classes = [classes.DragLeave];
        this.setState({dragging_over: false});
    }

    onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        let new_el = e.dataTransfer.getData("type");
        this.addElementHandler(new_el)

        this.dragOver_classes = [classes.DragLeave];
        this.setState({dragging_over: false});
    }

    addElementHandler = (type) => {
        const oldCount = this.state.html_elements[type];
        const updatedCount = oldCount + 1;
        const updatedElements = {
            ...this.state.html_elements
        }
        updatedElements[type] = updatedCount;

        this.setState({
            html_elements: updatedElements,
        });
    }

    removeElementHandler = (type) => {
        const oldCount = this.state.html_elements[type];
        const updatedCount = oldCount - 1;
        const updatedElements = {
            ...this.state.html_elements
        }
        updatedElements[type] = Math.max(updatedCount, 0);
        this.setState({
            html_elements: updatedElements
        });
    }

    render() {
        return(
            <AuxComp>
                <BuildControls />
                <div 
                    style={{margin: '10px'}}
                    className={this.dragOver_classes.join(' ')}
                    onDrop={(e) => this.onDrop(e)}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDragLeave={(e) => this.onDragLeave(e)}>
                    <Page 
                        html_elements={this.state.html_elements} 
                        elementRemoved={(type) => this.removeElementHandler}/>
                </div>
            </AuxComp>
        )
    }
};

export default PageBuilder; 