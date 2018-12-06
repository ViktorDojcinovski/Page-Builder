import React from 'react';

import classes from './Page.css';
import PageComponent from './PageComponent/PageComponent';

const page = (props) => {

    let commutedElements = Object.keys(props.html_elements)
        .map(element => {
            return [...Array(props.html_elements[element])].map((__, i) => {
                return <PageComponent key={element + i} type={element} removeElement={(e) => props.elementRemoved(e)}/>
            });
        })
        .reduce((arr, el) => { 
            return arr.concat(el) },
        []);

    if(commutedElements.length === 0) commutedElements = <span className={classes.Placeholder}>Start adding elements here!</span>;

    return (
        <div 
            className={classes.Page}>
                {commutedElements}
        </div>
    )

}

export default page;