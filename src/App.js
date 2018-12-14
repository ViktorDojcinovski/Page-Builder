import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import PageBuilder from './containers/PageBuilder/PageBuilder';
import PageList from './containers/PageList/PageList';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faWindowClose, faImage, faHeading, faCode, faFont, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add( faWindowClose, faImage, faHeading, faCode, faFont, faEdit, faTrash )

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/pages" component={PageList} />
          <Route path="/" exact component={PageBuilder} />
        </Layout>
      </div>
    );
  }
}

export default App;
