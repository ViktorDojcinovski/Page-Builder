import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import PageBuilder from './containers/PageBuilder/PageBuilder';
import Pages from './containers/Pages/Pages';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faWindowClose, faImage, faHeading, faCode, faFont } from '@fortawesome/free-solid-svg-icons'

library.add(faWindowClose, faImage, faHeading, faCode, faFont)

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/pages" component={Pages} />
          <Route path="/" exact component={PageBuilder} />
        </Layout>
      </div>
    );
  }
}

export default App;
