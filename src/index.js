import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.render(
  <Router>
    <div id='main_page'>
      <Routes />
    </div>
  </Router>,
  document.getElementById('root')
);

