import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AuxComp from '../../hoc/AuxComp/AuxComp';
import BuildControls from '../../components/Page/Controls/BuildControls';
import Page from '../../components/Page/Page';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './PageBuilder.css';

import axios from '../../axios-pages';
import sendAPIRequest from '../../client';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

var html2json = require('html2json').html2json;
var json2html = require('html2json').json2html;

class PageBuilder extends Component {

    dragOver_classes = [classes.DragLeave];
    pageId = null;
    page_html = null;

    state = {
        pageForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Insert page name...'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        html_elements: {
            'header': { count: 0, ids: [] },
            'footer': { count: 0, ids: [] },
            'image': { count: 0, ids: [] },
            'text': { count: 0, ids: [] },
        },
        error: false,
        loading: false,
        edit_mode: false,
        dragging_over: false,
        pages: null
    }

    constructor(props) {
        super(props);
        this.page = React.createRef();
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

        if(new_el === "image") {
            this.imageDropHandler();
        } else {
            this.addElementHandler(new_el);
        }

        this.dragOver_classes = [classes.DragLeave];
        this.setState({dragging_over: false});
    }

    imageDropHandler = (event) => {
        this.setState({ imageBrowsing: true }); 
    }

    insertImageContinued = () => {

        this.addElementHandler("image");
        const page = ReactDOM.findDOMNode(this.page.current);
        const length = this.state.html_elements["image"]['ids'].length;
        const image_id = '#' + this.state.html_elements["image"]['ids'][length - 1];
        const file = document.querySelector('input[type="file"]').files[0];
        
        const reader = new FileReader();
        
        reader.addEventListener("load", function () {
            const image = page.querySelector(image_id);
            image.src = reader.result;
        }, false);
        
        if (file) {
            reader.readAsDataURL(file);
            this.setState({ imageBrowsing: false });
        }
    }

    addElementHandler = (type) => {
        const oldCount = this.state.html_elements[type]['count'];
        const updatedCount = oldCount + 1;
        const updatedElements = {
            ...this.state.html_elements
        }
        updatedElements[type]['count'] = updatedCount;

        updatedElements[type]['ids'].push(type + updatedCount);

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

    createPageContinued = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );

        const page = ReactDOM.findDOMNode(this.page.current);
        const page_html = html2json(page.innerHTML);

        const html = {
            page: {
                name: this.state.pageForm.name.value,
                html_elements: this.state.html_elements,
                page_content: page_html
            }
        }

        sendAPIRequest()
             .then(response => {
                axios.post( '/admin/add-page', {page: html.page}, {headers: {
                        authorization: `${response.token_type} ${response.access_token}`,
                    }})
                    .then( response => {
                        this.props.history.push( '/pages' );
                    })
                    .catch( error => {
                        this.setState( { loading: false } );
                    });
            })
            .catch(err => {
                console.log('Error:' + err);
            });
    };

    editPageContinued = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );

        const page = ReactDOM.findDOMNode(this.page.current);
        const page_html = html2json(page.innerHTML);

        const html = {
            page: {
                pageId: this.pageId,
                name: this.state.pageForm.name.value,
                html_elements: this.state.html_elements,
                page_content: page_html
            }
        }
        sendAPIRequest()
             .then(response => {
                axios.post( '/admin/edit-page', {page: html.page}, {headers: {
                        authorization: `${response.token_type} ${response.access_token}`,
                    }})
                    .then( response => {
                        this.props.history.push( '/pages' );
                    })
                    .catch( error => {
                        this.setState( { loading: false } );
                    });
            })
            .catch(err => {
                console.log('Error:' + err);
            });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        console.log(rules.minLength);
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid;
    }

    onChangedHandler = (event, inputIdentifier) => {
        const updatedPageForm = {
            ...this.state.pageForm
        };
        const updatedFormElement = { 
            ...updatedPageForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedPageForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedPageForm) {
            formIsValid = updatedPageForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({pageForm: updatedPageForm, formIsValid: formIsValid});
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);

        for(let p of query.entries()) {
            if(p[0] && p[0] === 'pageId') {
                this.setState({edit_mode: true, loading: true});
                this.pageId = p[1];
            }
        }
    }

    componentDidMount() {    
        if(this.state.edit_mode) {
            sendAPIRequest()
                .then(response => {
                    axios.get(`/admin/edit-page/${this.pageId}`, {headers: {
                            authorization: `${response.token_type} ${response.access_token}`,
                        }})
                        .then(response => {
                            this.setState({pages: response.data});
                            this.page_html = json2html(response.data.page_content);  
                            const updatedFormProperties = {
                                ...this.state.pageForm
                            }
                            updatedFormProperties.name.value = response.data.name;
                            this.setState({pageForm: updatedFormProperties, html_elements: response.data.html_elements, loading: false});
                        })
                        .catch(err => {
                            this.setState({error: true, pages: response.data});
                            console.log(err);
                        })
                })
                .catch(error => {
                    console.log(error);
                    this.setState({error: true});
                })
        }
    }

    render() {

        let pages = this.state.error ? <p>{ escape("The page you have requested can't be loaded!") }</p> : <Spinner />;

        const formElementsArray = [];
        for (let key in this.state.pageForm) {
            formElementsArray.push({
                id: key,
                config: this.state.pageForm[key]
            });
        }

        if(!this.state.loading) {
            pages = (
                <AuxComp>
                    <Modal 
                        show={this.state.imageBrowsing}>
                        <Input
                            refernce="inputFile"
                            elementType={'input'} 
                            elementConfig={ {type:'file', placeholder:'Insert image...'} } />
                        <Button btnType='Danger' clicked={(e) => this.insertImageCancelled(e)}> Cancel </Button>
                        <Button btnType='Success' clicked={(e) => this.insertImageContinued(e)}> Ok </Button>
                    </Modal>
                    <AuxComp>
                        {formElementsArray.map(formElement => (
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.onChangedHandler(event, formElement.id)} />
                        ))}
                    </AuxComp>
                    <BuildControls />
                    <div 
                        style={{margin: '10px'}}
                        className={this.dragOver_classes.join(' ')}
                        onDrop={(e) => this.onDrop(e)}
                        onDragOver={(e) => this.onDragOver(e)}
                        onDragLeave={(e) => this.onDragLeave(e)}>
                        <Page
                            ref={this.page}
                            html_elements={this.state.html_elements} 
                            elementRemoved={(type) => this.removeElementHandler}
                            page_html={this.page_html}
                            edit_mode={this.state.edit_mode} />  
                    </div>
                    { this.state.edit_mode ? 
                        <Button btnType='Warning' clicked={(e) => this.editPageContinued(e)} disabled={!this.state.formIsValid}>Update</Button> :
                        <Button btnType='Success' clicked={(e) => this.createPageContinued(e)} disabled={!this.state.formIsValid}>Save</Button>
                    }
                </AuxComp>
            )
        }

        return(
            <AuxComp>
                {pages}
            </AuxComp>
        )
    }
};

export default withErrorHandler(PageBuilder, axios); 