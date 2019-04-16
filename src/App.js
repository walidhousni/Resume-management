import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import Main from './Routes'
import Icon from './static/icon.png'
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Maltem CV</title>
          <meta charset="UTF-8" />
          <meta name="description" content="Maltem CV Application" />
          <link rel="icon" type="image/png" href={Icon} />
        </Helmet>
        <Main />
      </React.Fragment>
    );
  }
}

export default App;
