import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import fetch from 'isomorphic-fetch';
import Layout from './src/components/layout';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    fetch,
    uri: 'http://localhost:8003/___graphql',
  }),
});

export const wrapRootElement = ({ element, props }) => (
  <ApolloProvider client={client}>
    <Layout {...props}>{element}</Layout>
  </ApolloProvider>
);
