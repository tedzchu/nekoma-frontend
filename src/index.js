import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faTimes,
  faCoffee,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './App';
// import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from './react-auth0-spa';
import { GraphQLProvider } from './GraphQLProvider';
import config from './auth_config.json';
import history from './utils/history';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

library.add(faCheck, faTimes, faCoffee, faArrowLeft);

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      audience={'https://nekoma.auth0.com/api/v2/'}
      redirect_uri={window.location.origin + window.location.pathname}
      onRedirectCallback={onRedirectCallback}
    >
      <GraphQLProvider>
        <App />
      </GraphQLProvider>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// serviceWorker.unregister();
