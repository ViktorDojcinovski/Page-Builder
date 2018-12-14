import React, { Component } from 'react';

import classes from './PageList.css';

import PageListItem from './PageListItem/PageListItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import AuxComp from '../../hoc/AuxComp/AuxComp';

import axios from '../../axios-pages';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import sendAPIRequest from '../../client';

class PageList extends Component {

    state = {
        error: false,
        pages: null
    }

    componentDidMount() {
        sendAPIRequest()
            .then(response => {
                axios.get('/admin/pages', {headers: {
                        authorization: `${response.token_type} ${response.access_token}`,
                    }})
                    .then(response => {
                        this.setState({error: false, pages: response.data});
                        
                    })
                    .catch(err => {
                        this.setState({error: true, pages: response.data});
                        console.log(err);
                    })
            })
    }

    deletePageHandler = (event, pageId) => {
        event.preventDefault();
        sendAPIRequest()
            .then(response => {
                axios.post('/admin/delete-page/', {pageId: pageId}, {headers: {
                        authorization: `${response.token_type} ${response.access_token}`,
                    }})
                    .then(response => {
                        console.log(response);
                        this.setState({pages: response.data})
                    })
                    .catch(err => {
                        this.setState({error: true, pages: response.data});
                        console.log(err);
                    })
            })
    }

    editPageHandler = (event, pageId) => {
        event.preventDefault();
        const queryString = 'pageId=' + pageId;
        this.props.history.push({
            pathname: '/',
            search: '?' + queryString
        });
    }

    render() {

        let pages = this.state.error ? <p>{ escape("Pages can't be loaded!") }</p> : <Spinner />;

        if(this.state.pages) {
            pages = (
                <div className={classes.PageList}>
                        <h1>List of created pages</h1>
                        {this.state.pages.map(page => {
                            return <PageListItem
                                key={page._id}
                                name={page.name}
                                deletePage={ (e) => this.deletePageHandler(e, page._id) }
                                editPage={ (e) => this.editPageHandler(e, page._id) }/>
                        })}
                    </div>
            );
        }

        return(
            <AuxComp>
                {pages}
            </AuxComp>
        )
    }
};

export default withErrorHandler(PageList, axios);