import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from './react-auth0-spa';

// Setup the network "links"
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split, ApolloLink, Observable } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

// https://github.com/auth0-samples/auth0-javascript-samples/issues/79
// https://github.com/vonkanehoffen/planning-alerts/blob/master/frontend-web/src/GraphQLProvider.js

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

  // https://github.com/apollographql/apollo-client/issues/3967#issuecomment-450255702
  const wsLink = new WebSocketLink({
    uri: 'wss://nekoma.herokuapp.com/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: async () => {
        const token = isAuthenticated ? await getTokenSilently() : null;
        return {
          headers: {
            authorization: token ? `Bearer ${token}` : undefined
          }
        }
      }
    },
  });
  
  const httpLink = new HttpLink({
    uri: 'https://nekoma.herokuapp.com/v1/graphql',
  });
  
  const request = async (operation) => {
    const token = isAuthenticated ? await getTokenSilently() : null;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : undefined
      }
    });
  };
  
  const requestLink = new ApolloLink((operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));
  
      return () => {
        if (handle) handle.unsubscribe();
      };
    })
  );

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link: ApolloLink.from([
      requestLink,
      link,
    ]),
    cache: new InMemoryCache(),
    // uri: 'https://nekoma.herokuapp.com/v1/graphql',
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
