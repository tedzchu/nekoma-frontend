import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from './react-auth0-spa';
import config from './auth_config.json';

// https://github.com/auth0-samples/auth0-javascript-samples/issues/79
// https://github.com/vonkanehoffen/planning-alerts/blob/master/frontend-web/src/GraphQLProvider.js

console.log(config);
/**
 * Apollo Provider with Auth0 token.
 * @param children
 * @returns {*}
 * @constructor
 */
export const GraphQLProvider = ({ children }) => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }

  const client = new ApolloClient({
    uri: config.graphQlEndpoint,
    request: async operation => {
      // Get token or get refreshed token
      const token = isAuthenticated ? await getTokenSilently() : null;
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : undefined
        }
      });
      console.log(token);
    }
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
