import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimes, faCoffee, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import App from './App';

library.add(faCheck, faTimes, faCoffee, faArrowLeft)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
