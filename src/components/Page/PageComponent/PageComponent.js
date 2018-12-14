import React from 'react';

import CloseBtn from '../../UI/FontAwesome/CloseIcon';

import classes from './PageComponent.css';

const pageComponent = (props) => {

    let comuted_to_html = '';
    const close_btn = <CloseBtn clicked={ (e) => e.target.parentElement.parentElement.remove() } />;
    
    switch(props.type) {
        case 'header':
            comuted_to_html = 
            <header>
                <h1 contentEditable suppressContentEditableWarning>Insert Header text here!</h1>
                {close_btn}
            </header>
            break;
        case 'footer':
            comuted_to_html = 
            <footer>
                <h2 contentEditable suppressContentEditableWarning>Insert Footer text here!</h2>
                {close_btn}
            </footer>
            break;
        case 'image':
            comuted_to_html = (
                <div className={classes.ImageHolder}>
                    <img alt="" id={props.id}/> 
                    {close_btn}
                </div>
            )
            break;
        case 'text':
            comuted_to_html = 
            <main>
                <span contentEditable suppressContentEditableWarning>Insert some text here!</span>
                {close_btn}
            </main>
            break;
        default:
            comuted_to_html = null;
    }

    return(
        comuted_to_html
    );
};

export default pageComponent;