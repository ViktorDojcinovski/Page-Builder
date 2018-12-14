import React, { Component } from 'react';

import classes from './Page.css';
import PageComponent from './PageComponent/PageComponent';
import AuxComp from '../../hoc/AuxComp/AuxComp';

class Page extends Component {

    createMarkup() {
        return {__html: this.props.page_html}; 
    }

    render() {
        let commutedElements = Object.keys(this.props.html_elements)
            .map(element => {
                return [...Array(this.props.html_elements[element]['count'])].map((__, i) => {
                    return <PageComponent key={element + i}  id={this.props.html_elements[element]['ids'][i]} type={element} removeElement={(e) => this.props.elementRemoved(e)}/>
                });
            })
            .reduce((arr, el) => { 
                return arr.concat(el) },
            []); 

        if(commutedElements.length === 0) commutedElements = <span className={classes.Placeholder}>Start adding elements here!</span>;

        return (
            <AuxComp>
                { this.props.edit_mode  ? 
                    <div className={classes.Page} dangerouslySetInnerHTML={this.createMarkup()} /> : 
                    <div className={classes.Page}> {commutedElements} </div> }
            </AuxComp>
        )
    }
}

export default Page;