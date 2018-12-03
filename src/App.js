import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import PageBuilder from './containers/PageBuilder/PageBuilder';
import Pages from './containers/Pages/Pages';

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
