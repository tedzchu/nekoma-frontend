import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimes, faCoffee, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './index.css'
import 'react-datepicker/dist/react-datepicker.css'
import App from './App'

library.add(faCheck, faTimes, faCoffee, faArrowLeft)

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
