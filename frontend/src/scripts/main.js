require('../assets/stylesheets/style.sass');

// TODO: Require assets here.
// require('../assets/images/product.png');

import App from './components/App.js';
import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(<App />, document.getElementById('main'));
