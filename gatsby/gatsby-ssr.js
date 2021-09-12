import React from 'react';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
// import { ApolloProvider } from '@apollo/client/react';
import fetch from 'isomorphic-fetch';
import Layout from './src/components/layout';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: 'http://localhost:8003/___graphql',
      // uri: 'https://wkuk75c2.api.sanity.io/v1/graphql/production/default',
      fetch,
    }),
  });

  if (typeof window !== 'undefined') {
    return (
      <ApolloProvider client={client}>
        <Layout>{element}</Layout>
      </ApolloProvider>
    );
  }

  return null;
}
